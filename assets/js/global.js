/* ============================================================
   D INVITES — GLOBAL SCRIPT
   Shared across every page: mobile nav menu, generic form/status
   helpers, toggle-switch wiring. Page-specific logic (Supabase
   calls, page forms) stays in that page's own <script type="module">
   and can call into window.DInvites below.
   ============================================================ */
(function () {
  const $ = (id) => document.getElementById(id);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Mobile nav drawer ---------- */
  function initNavMenu() {
    const btn = $('nav-menu-btn');
    const drawer = $('nav-drawer');
    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      btn.innerHTML = open
        ? '<i class="fas fa-regular fa-xmark"></i>'
        : '<i class="fas fa-regular fa-bars"></i>';
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow= open?'hidden':'auto';
    });

    // close drawer when a link inside it is clicked
    $$('a', drawer).forEach((a) =>
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        btn.innerHTML = '<i class="fas fa-regular fa-bars"></i>';
        document.body.style.overflow= 'auto';
      })
    );
  }

  /* ---------- Tabs (login/signup style switches) ---------- */
  function initTabs() {
    $$('[data-tab-group]').forEach((group) => {
      const groupName = group.dataset.tabGroup;
      const tabs = $$('.tab', group);
      tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          tabs.forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
          const target = tab.dataset.tab;
          $$(`[data-tab-panel][data-tab-group-for="${groupName}"]`).forEach((panel) => {
            panel.classList.toggle('active', panel.dataset.tabPanel === target);
          });
          document.dispatchEvent(new CustomEvent('tabchange', { detail: { group: groupName, target } }));
        });
      });
    });
  }

  /* ---------- Generic status message helper ---------- */
  function setStatus(el, msg, type = 'err') {
    if (!el) return;
    el.textContent = msg || '';
    el.className = 'status-msg' + (msg ? ' ' + type : '');
  }

  /* ---------- Generic button loading state ---------- */
  function setLoading(btn, loading, loadingLabel = 'Loading') {
    if (!btn) return;
    if (loading) {
      btn.dataset.original = btn.dataset.original || btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner spin"></i> ${loadingLabel}`;
    } else {
      btn.disabled = false;
      if (btn.dataset.original) btn.innerHTML = btn.dataset.original;
    }
  }

  /* ---------- Password visibility toggle (data-toggle-password="inputId") ---------- */
  function initPasswordToggles() {
    $$('[data-toggle-password]').forEach((icon) => {
      const input = $(icon.dataset.togglePassword);
      if (!input) return;
      icon.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        icon.classList.toggle('fa-eye', !show);
        icon.classList.toggle('fa-eye-slash', show);
      });
    });
  }

  /* ---------- Generic toggle switch (theme, settings, etc.) ---------- */
  function initToggles() {
    $$('.toggle input[data-onchange]').forEach((input) => {
      input.addEventListener('change', () => {
        const fnName = input.dataset.onchange;
        if (typeof window[fnName] === 'function') window[fnName](input.checked);
      });
    });
  }

  /* ---------- Sticky nav shadow on scroll ---------- */
  function initNavScrollState() {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavMenu();
    initTabs();
    initPasswordToggles();
    initToggles();
    initNavScrollState();
  });

  window.DInvites = { $, $$, setStatus, setLoading };
})();
const tu= "https://ostmbucbsptftvbwhmjc.supabase.co";
const tk= "sb_publishable_0eJBR0X5fmU1FTyu346etQ_6syHbiCo";
const footer = document.querySelector(".footer-bottom");
if(footer){
footer.innerHTML= `
                <div class="foot-meta">© ${new Date().getFullYear()} D invites · invites.devtem.org</div> <div class="foot-meta">Built by <a href="https://devtem.org"> DevTemple </a></div>
`;
}
