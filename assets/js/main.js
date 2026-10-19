/* =====================================================================
   EL PLAYA DE VEHÍCULOS · Núñez
   Lógica del catálogo
   ===================================================================== */
(function () {
  'use strict';

  var DATA = window.INVENTARIO || { negocio: {}, vehiculos: [] };
  var NEG  = DATA.negocio || {};
  var VEH  = DATA.vehiculos || [];

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------
     Helpers
  --------------------------------------------------------------- */
  function guaranies(n) {
    return 'Gs. ' + Number(n || 0).toLocaleString('es-PY');
  }
  function km(n) {
    return Number(n || 0).toLocaleString('es-PY') + ' km';
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function waLink(msg) {
    return 'https://wa.me/' + (NEG.whatsapp || '595983748463') + '?text=' + encodeURIComponent(msg);
  }
  function slug(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function marcaDe(v) {
    if (v.marca) return v.marca;
    return String(v.nombre || '').split(' ')[0] || 'Otros';
  }
  function imgFallback(img) {
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#F1F3F5"/><stop offset="1" stop-color="#DDE1E5"/></linearGradient></defs>' +
      '<rect width="640" height="440" fill="url(#g)"/>' +
      '<path d="M120 300h400l-28-72a24 24 0 0 0-22-15H170a24 24 0 0 0-22 15Z" fill="none" stroke="#B9BFC5" stroke-width="7" stroke-linejoin="round"/>' +
      '<path d="M150 300v40m340-40v40" stroke="#B9BFC5" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="205" cy="310" r="26" fill="none" stroke="#B9BFC5" stroke-width="7"/>' +
      '<circle cx="435" cy="310" r="26" fill="none" stroke="#B9BFC5" stroke-width="7"/>' +
      '<text x="320" y="130" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="27" fill="#8B9299">EL PLAYA DE VEHÍCULOS</text>' +
      '</svg>');
  }

  var ICON = {
    year:  '<svg viewBox="0 0 24 24"><path d="M7 3v3M17 3v3M3.5 9h17M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/></svg>',
    km:    '<svg viewBox="0 0 24 24"><path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0-4-8H9l-4 8m4-8 1.5-3h3L15 9m-6 8h12"/></svg>',
    fuel:  '<svg viewBox="0 0 24 24"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M4 11h10M16 9l3 3v7a2 2 0 0 1-4 0v-4h4"/></svg>',
    trans: '<svg viewBox="0 0 24 24"><circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M7 8.5V15a3 3 0 0 0 3 3h4.5"/></svg>',
    seat:  '<svg viewBox="0 0 24 24"><path d="M6 19v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M8 13V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v7"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z"/></svg>'
  };

  /* ---------------------------------------------------------------
     Favoritos (localStorage)
  --------------------------------------------------------------- */
  var FAV_KEY = 'playa-favoritos';
  var favs = {};
  try { favs = JSON.parse(localStorage.getItem(FAV_KEY) || '{}') || {}; } catch (e) { favs = {}; }
  function saveFavs() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
  }
  function isFav(id) { return !!favs[id]; }
  function toggleFav(id) {
    favs[id] = !favs[id];
    if (!favs[id]) delete favs[id];
    saveFavs();
    return !!favs[id];
  }

  /* ---------------------------------------------------------------
     Render de tarjetas
  --------------------------------------------------------------- */
  function cardHTML(v, i) {
    var tags = [];
    if (v.destacado) tags.push('<span class="tag tag--top">Destacado</span>');
    if (v.condicion && v.condicion.toLowerCase().indexOf('semi') !== -1) tags.push('<span class="tag tag--new">Seminuevo</span>');
    if (v.financiamiento) tags.push('<span class="tag">Financiable</span>');

    var specs = [];
    if (v.anio) specs.push('<span class="spec">' + ICON.year + esc(v.anio) + '</span>');
    if (v.km) specs.push('<span class="spec">' + ICON.km + esc(km(v.km)) + '</span>');
    if (v.transmision) specs.push('<span class="spec">' + ICON.trans + esc(v.transmision) + '</span>');
    if (v.combustible) specs.push('<span class="spec">' + ICON.fuel + esc(v.combustible) + '</span>');

    return '' +
      '<article class="vcard" data-id="' + esc(v.id) + '" style="animation-delay:' + (i * 45) + 'ms">' +
        '<div class="vcard__media">' +
          '<img src="' + esc(v.imagen) + '" alt="' + esc(v.nombre + ' ' + (v.version || '')) + '" loading="lazy" onerror="this.src=\'' + imgFallback(v.imagen) + '\'">' +
          (tags.length ? '<div class="vcard__tags">' + tags.join('') + '</div>' : '') +
          '<button class="vcard__fav' + (isFav(v.id) ? ' is-on' : '') + '" data-fav="' + esc(v.id) + '" aria-label="Guardar en favoritos" aria-pressed="' + (isFav(v.id)) + '">' + ICON.heart + '</button>' +
        '</div>' +
        '<div class="vcard__body">' +
          '<div class="vcard__title">' +
            '<h3>' + esc(v.nombre) + '</h3>' +
            '<span>' + esc(v.version || '') + (v.color ? ' · ' + esc(v.color) : '') + '</span>' +
          '</div>' +
          '<div class="vcard__specs">' + specs.join('') + '</div>' +
          '<p class="vcard__desc">' + esc(v.descripcion || '') + '</p>' +
          '<div class="vcard__foot">' +
            '<div class="vcard__price"><small>Precio</small><strong>' + guaranies(v.precio) + '</strong></div>' +
            '<div class="vcard__actions">' +
              '<button class="btn btn--outline" data-detalle="' + esc(v.id) + '">Ver detalle</button>' +
              '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + waLink('Hola Núñez, me interesa el ' + v.nombre + ' ' + (v.version || '') + ' (' + v.anio + '). ¿Sigue disponible?') + '">WhatsApp</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderGrid(list) {
    var grid = $('#grid');
    grid.innerHTML = list.map(cardHTML).join('');
    var empty = $('#empty');
    empty.hidden = list.length > 0;
    grid.hidden = list.length === 0;
    $('#count').textContent = list.length;
  }

  function renderDestacados() {
    var g = $('#gridDestacados');
    if (!g) return;
    var dest = VEH.filter(function (v) { return v.destacado; }).slice(0, 3);
    g.innerHTML = dest.map(cardHTML).join('');
  }

  /* ---------------------------------------------------------------
     Filtros
  --------------------------------------------------------------- */
  function fillSelect(id, values, firstLabel) {
    var sel = $(id);
    if (!sel) return;
    var html = '<option value="">' + firstLabel + '</option>';
    values.forEach(function (v) {
      html += '<option value="' + esc(v) + '">' + esc(v) + '</option>';
    });
    sel.innerHTML = html;
  }

  function uniq(fn) {
    var seen = {}, out = [];
    VEH.forEach(function (v) {
      var val = fn(v);
      if (val && !seen[val]) { seen[val] = 1; out.push(val); }
    });
    return out.sort();
  }

  function setupFilters() {
    fillSelect('#fMarca', uniq(marcaDe).sort(), 'Todas');
    fillSelect('#fCuerpo', uniq(function (v) { return v.cuerpo; }).sort(), 'Todos');
    fillSelect('#fTrans', uniq(function (v) { return v.transmision; }).sort(), 'Todas');
    fillSelect('#fComb', uniq(function (v) { return v.combustible; }).sort(), 'Todos');

    var anios = uniq(function (v) { return v.anio; }).sort(function (a, b) { return b - a; });
    var selAnio = $('#fAnio');
    if (selAnio) {
      selAnio.innerHTML = '<option value="">Cualquiera</option>' + anios.map(function (a) {
        return '<option value="' + a + '">Desde ' + a + '</option>';
      }).join('');
    }

    var max = Math.max.apply(null, VEH.map(function (v) { return v.precio || 0; }).concat([0]));
    var maxRound = Math.ceil(max / 5000000) * 5000000;
    var slider = $('#fPrecio');
    if (slider) {
      slider.max = maxRound;
      slider.value = maxRound;
      $('#precioLabel').textContent = 'Sin límite';
    }

    ['#fMarca', '#fCuerpo', '#fTrans', '#fComb', '#fAnio', '#fPrecio', '#fDestacado', '#fOrden', '#q']
      .forEach(function (sel) {
        var el = $(sel);
        if (!el) return;
        el.addEventListener('input', applyFilters);
        el.addEventListener('change', applyFilters);
      });

    var clear = function () {
      ['#fMarca', '#fCuerpo', '#fTrans', '#fComb', '#fAnio'].forEach(function (s) { if ($(s)) $(s).value = ''; });
      if ($('#fPrecio')) { $('#fPrecio').value = $('#fPrecio').max; $('#precioLabel').textContent = 'Sin límite'; }
      if ($('#fDestacado')) $('#fDestacado').checked = false;
      if ($('#fOrden')) $('#fOrden').value = 'destacado';
      if ($('#q')) $('#q').value = '';
      applyFilters();
    };
    var b1 = $('#btnLimpiar'), b2 = $('#btnLimpiar2');
    if (b1) b1.addEventListener('click', clear);
    if (b2) b2.addEventListener('click', clear);
  }

  function applyFilters() {
    var q = ($('#q') && $('#q').value || '').trim().toLowerCase();
    var fMarca = $('#fMarca') ? $('#fMarca').value : '';
    var fCuerpo = $('#fCuerpo') ? $('#fCuerpo').value : '';
    var fTrans = $('#fTrans') ? $('#fTrans').value : '';
    var fComb = $('#fComb') ? $('#fComb').value : '';
    var fAnio = $('#fAnio') ? $('#fAnio').value : '';
    var fPrecio = $('#fPrecio') ? Number($('#fPrecio').value) : Infinity;
    var fDest = $('#fDestacado') ? $('#fDestacado').checked : false;
    var orden = $('#fOrden') ? $('#fOrden').value : 'destacado';

    if ($('#precioLabel')) {
      var maxSlider = Number($('#fPrecio').max);
      $('#precioLabel').textContent = (fPrecio >= maxSlider) ? 'Sin límite' : guaranies(fPrecio);
    }

    var list = VEH.filter(function (v) {
      if (q) {
        var hay = [v.nombre, v.version, v.anio, v.cuerpo, v.combustible, v.transmision, v.color, (v.tags || []).join(' ')]
          .join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      if (fMarca && marcaDe(v) !== fMarca) return false;
      if (fCuerpo && v.cuerpo !== fCuerpo) return false;
      if (fTrans && v.transmision !== fTrans) return false;
      if (fComb && v.combustible !== fComb) return false;
      if (fAnio && Number(v.anio) < Number(fAnio)) return false;
      if (Number(v.precio) > fPrecio) return false;
      if (fDest && !v.destacado) return false;
      return true;
    });

    var by = {
      'precio-asc':  function (a, b) { return a.precio - b.precio; },
      'precio-desc': function (a, b) { return b.precio - a.precio; },
      'anio-desc':   function (a, b) { return b.anio - a.anio; },
      'km-asc':      function (a, b) { return a.km - b.km; },
      'destacado':   function (a, b) { return (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0) || a.precio - b.precio; }
    }[orden] || function () { return 0; };
    list.sort(by);

    renderGrid(list);
  }

  /* ---------------------------------------------------------------
     Modal de detalle
  --------------------------------------------------------------- */
  function openModal(id) {
    var v = null;
    for (var i = 0; i < VEH.length; i++) { if (VEH[i].id === id) { v = VEH[i]; break; } }
    if (!v) return;

    var specs = [
      ['Marca', marcaDe(v)],
      ['Modelo', v.nombre],
      ['Versión', v.version],
      ['Año', v.anio],
      ['Kilometraje', km(v.km)],
      ['Condición', v.condicion],
      ['Carrocería', v.cuerpo],
      ['Combustible', v.combustible],
      ['Transmisión', v.transmision],
      ['Puertas', v.puertas],
      ['Color', v.color],
      ['Ubicación', v.ubicacion]
    ].filter(function (r) { return r[1] !== undefined && r[1] !== null && r[1] !== ''; });

    var specHTML = specs.map(function (r) {
      return '<div class="m-spec"><small>' + esc(r[0]) + '</small><strong>' + esc(r[1]) + '</strong></div>';
    }).join('');

    var tags = (v.tags || []).map(function (t) { return '<span class="spec">' + esc(t) + '</span>'; }).join('');

    var wa = waLink('Hola Núñez, me interesa el ' + v.nombre + ' ' + (v.version || '') + ' (' + v.anio + ') — ' + guaranies(v.precio) + '. ¿Sigue disponible? ¿Podés enviarme más fotos?');

    $('#modalBody').innerHTML =
      '<img class="m-img" src="' + esc(v.imagen) + '" alt="' + esc(v.nombre) + '" onerror="this.src=\'' + imgFallback(v.imagen) + '\'">' +
      '<div class="m-head">' +
        '<h3 id="modalTitle">' + esc(v.nombre) + ' ' + esc(v.version || '') + '</h3>' +
        '<p class="m-ver">' + esc(v.condicion || '') + ' · ' + esc(v.color || '') + ' · ' + esc(v.ubicacion || '') + '</p>' +
        '<p class="m-price">' + guaranies(v.precio) + '</p>' +
        (v.destacado ? '<span class="badge badge--red">Vehículo destacado</span>' : '') +
      '</div>' +
      '<div class="m-body">' +
        '<div class="m-specs">' + specHTML + '</div>' +
        (tags ? '<div class="vcard__specs" style="margin-bottom:18px">' + tags + '</div>' : '') +
        '<p class="m-desc">' + esc(v.descripcion || '') + '</p>' +
        (v.garantia ? '<p class="m-guarantee">✓ ' + esc(v.garantia) + (v.financiamiento ? ' · Financiable' : '') + '</p>' : '') +
        '<div class="m-actions">' +
          '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + wa + '">Consultar por WhatsApp</a>' +
          '<button class="btn btn--outline" data-fav="' + esc(v.id) + '">' + (isFav(v.id) ? 'Quitar de favoritos' : 'Guardar en favoritos') + '</button>' +
        '</div>' +
      '</div>';

    var modal = $('#modal');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal__close').focus();
  }

  function closeModal() {
    var modal = $('#modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  /* ---------------------------------------------------------------
     Eventos globales
  --------------------------------------------------------------- */
  function bindEvents() {
    document.addEventListener('click', function (e) {
      var fav = e.target.closest ? e.target.closest('[data-fav]') : null;
      if (fav) {
        e.preventDefault();
        e.stopPropagation();
        var id = fav.getAttribute('data-fav');
        var on = toggleFav(id);
        if (fav.classList.contains('vcard__fav')) {
          fav.classList.toggle('is-on', on);
          fav.setAttribute('aria-pressed', String(on));
        } else {
          fav.textContent = on ? 'Quitar de favoritos' : 'Guardar en favoritos';
        }
        return;
      }

      var det = e.target.closest ? e.target.closest('[data-detalle]') : null;
      if (det) { openModal(det.getAttribute('data-detalle')); return; }

      if (e.target.closest && e.target.closest('[data-close]')) { closeModal(); return; }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); closeNav(); }
    });

    // Formulario de contacto -> WhatsApp
    var form = $('#formContacto');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var nombre = ($('#cNombre').value || '').trim();
        var tel = ($('#cTel').value || '').trim();
        var interes = $('#cInteres').value;
        var msg = ($('#cMsg').value || '').trim();
        if (!nombre || !tel) {
          var first = !nombre ? $('#cNombre') : $('#cTel');
          first.focus();
          first.style.borderColor = 'var(--rojo)';
          return;
        }
        var texto = 'Hola Núñez, soy ' + nombre + ' (' + tel + ').\nMe interesa: ' + interes + '.' + (msg ? '\n' + msg : '');
        window.open(waLink(texto), '_blank', 'noopener');
      });
    }

    // Nav móvil
    var toggle = $('#navToggle'), nav = $('#nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      });
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeNav();
      });
    }
  }

  function closeNav() {
    var nav = $('#nav'), toggle = $('#navToggle');
    if (nav) nav.classList.remove('is-open');
    if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); }
  }

  /* ---------------------------------------------------------------
     Header con sombra + reveal
  --------------------------------------------------------------- */
  function bindScroll() {
    var header = $('#header');
    var onScroll = function () {
      if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     Datos del negocio en la página
  --------------------------------------------------------------- */
  function applyNegocio() {
    var map = $('#mapaFrame');
    if (map && NEG.mapa) map.src = NEG.mapa;

    var hl = $('#horarioList');
    if (hl && NEG.horario) {
      hl.innerHTML = NEG.horario.map(function (h) {
        return '<li><span>' + esc(h.dia) + '</span><b>' + esc(h.hora) + '</b></li>';
      }).join('');
    }

    // Enlaces de WhatsApp que no tengan href fijo
    $$('[data-wa-general]').forEach(function (a) {
      a.href = waLink('Hola Núñez, quiero consultar por un vehículo.');
    });

    // Teléfono en todos los links tel:
    $$('a[href^="tel:"]').forEach(function (a) {
      a.href = 'tel:' + (NEG.telefonoEnlace || '+595983748463');
    });

    // Contador de unidades disponibles (dinámico)
    $$('.hero__stats strong[data-count]').forEach(function (el) {
      el.textContent = VEH.length;
    });

    // Nombre del negocio en el topbar si existe
    $$('.footer__brand strong').forEach(function (el) { el.textContent = NEG.nombre || 'El Playa de Vehículos'; });
    $$('.brand__text small').forEach(function (el) {
      el.textContent = (NEG.propietario || 'Núñez') + ' · ' + (NEG.ciudad || 'Villarrica');
    });
  }

  /* ---------------------------------------------------------------
     Créditos de las fotos
  --------------------------------------------------------------- */
  function renderCreditos() {
    var list = $('#creditosList');
    if (!list) return;
    var data = window.CREDITOS || [];
    if (!data.length) { list.parentNode.style.display = 'none'; return; }
    list.innerHTML = data.map(function (c) {
      return '' +
        '<li class="creditos__item">' +
          '<img src="' + esc(c.archivo) + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<div>' +
            '<b>' + esc(c.vehiculo) + '</b>' +
            '<span>Foto: ' + esc(c.autor) + '</span>' +
            '<span>' + (c.licenciaUrl
              ? '<a href="' + esc(c.licenciaUrl) + '" target="_blank" rel="noopener nofollow">' + esc(c.licencia) + '</a>'
              : esc(c.licencia)) + ' · <a href="' + esc(c.fuente) + '" target="_blank" rel="noopener nofollow">Wikimedia Commons</a></span>' +
          '</div>' +
        '</li>';
    }).join('');
  }

  /* ---------------------------------------------------------------
     Init
  --------------------------------------------------------------- */
  function init() {
    var y = $('#anio'); if (y) y.textContent = new Date().getFullYear();
    applyNegocio();
    setupFilters();
    renderGrid(VEH);
    renderDestacados();
    renderCreditos();
    bindEvents();
    bindScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
