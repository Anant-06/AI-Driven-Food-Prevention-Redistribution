(() => {
  const roles = {
    provider: { label: "Food provider", email: "provider@secondserving.demo", password: "ShareFood2026!" },
    ngo: { label: "NGO or food bank", email: "ngo@secondserving.demo", password: "RescueMeals2026!" },
    volunteer: { label: "Volunteer", email: "volunteer@secondserving.demo", password: "Pickup2026!" },
  };
  const roleCards = `
    <section class="join-network" id="join"><div class="join-heading"><div><div class="eyebrow">05 / FIND YOUR PLACE IN THE NETWORK</div><h2>Good things happen<br>when we <em>join in.</em></h2></div><p>Choose how you’d like to help good food reach more people. Each role gets tools and alerts that fit.</p></div><div class="member-banner" id="memberBanner" hidden></div><div class="member-dashboard" id="memberDashboard" hidden><div class="eyebrow" id="memberRoleLabel"></div><h3 id="memberRoleTitle"></h3><p id="memberRoleIntro"></p><div class="member-actions"><button class="button" type="button" id="memberRoleAction"></button><button class="member-signout" type="button" id="memberSignout">Sign out</button></div></div><div class="join-cards" id="joinCards">
      <article class="join-card"><span class="role-icon">♧</span><h3>Restaurants, hotels & events</h3><ul><li>Predict tomorrow’s surplus before it happens</li><li>Publish listings in one click</li><li>Track who collected your food</li></ul><button data-join="provider">Join as provider <span>→</span></button></article>
      <article class="join-card"><span class="role-icon">♡</span><h3>NGOs & food banks</h3><ul><li>Real-time alerts for surplus near you</li><li>Claim food with a safe-consumption window</li><li>Coordinate pickups with providers</li></ul><button data-join="ngo">Join as NGO <span>→</span></button></article>
      <article class="join-card"><span class="role-icon">⇢</span><h3>Volunteers</h3><ul><li>Help move food across your neighbourhood</li><li>Claim and collect surplus listings</li><li>Build your impact record</li></ul><button data-join="volunteer">Join as volunteer <span>→</span></button></article>
    </div><div class="demo-access" id="demoAccess"><div><span>WANT TO LOOK AROUND?</span><strong>Try a demo account</strong><small>Demo-only credentials. Select an account to sign in.</small></div>${Object.entries(roles).map(([key, role]) => `<button data-demo="${key}"><b>${role.label}</b><small>${role.email}<br>${role.password}</small></button>`).join("")}</div></section>`;
  const authModal = `<div class="modal-bg" id="authModal"><form class="modal auth-modal" id="authForm"><button class="close" type="button" aria-label="Close">×</button><div class="eyebrow">SECOND SERVING · COMMUNITY NETWORK</div><h2 id="authTitle">Join the<br>good food loop.</h2><p id="authIntro">Create an account to join nearby food rescue.</p><label id="nameField">Your name<input name="name" required placeholder="e.g. Alex Morgan"></label><label id="orgField">Organization<input name="organization" required placeholder="Kitchen, NGO, or community group"></label><label>Email<input name="email" type="email" required autocomplete="email" placeholder="you@organization.org"></label><label>Password<input name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="At least 8 characters"></label><p class="auth-error" id="authError" role="alert" hidden></p><button class="button modal-submit" type="submit" id="authSubmit">Create account ↗</button><button class="auth-switch" type="button" id="authSwitch">Already a member? Sign in</button><small class="auth-note">Demo only: profiles are stored in this browser. Don’t reuse a real password.</small></form></div>`;
  document.querySelector("#approach").insertAdjacentHTML("beforebegin", roleCards);
  document.body.insertAdjacentHTML("beforeend", authModal);
  const modal = document.querySelector("#authModal"), form = document.querySelector("#authForm"), switcher = document.querySelector("#authSwitch");
  const navAction = document.querySelector(".nav .button");
  navAction.removeAttribute("data-open");
  let selectedRole = "provider", mode = "join";
  function setRole(role) { selectedRole = role; }
  function setMode(next) { mode = next; document.querySelector("#authTitle").innerHTML = mode === "join" ? "Join the<br>good food loop." : "Welcome<br>back."; document.querySelector("#authIntro").textContent = mode === "join" ? `Create a ${roles[selectedRole].label.toLowerCase()} account to join nearby food rescue.` : `Sign in to your ${roles[selectedRole].label.toLowerCase()} account.`; document.querySelector("#nameField").hidden = document.querySelector("#orgField").hidden = mode === "login"; document.querySelector('[name="password"]').autocomplete = mode === "join" ? "new-password" : "current-password"; document.querySelector('[name="password"]').placeholder = mode === "join" ? "At least 8 characters" : "Your password"; document.querySelector("#authSubmit").textContent = mode === "join" ? "Create account ↗" : "Sign in ↗"; switcher.textContent = mode === "join" ? "Already a member? Sign in" : "New here? Join the network"; document.querySelector("#authError").hidden = true; }
  function open(role = "provider", nextMode = "join") { setRole(role); setMode(nextMode); form.reset(); modal.classList.add("open"); }
  async function hash(value) { const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)); return [...new Uint8Array(buffer)].map(byte => byte.toString(16).padStart(2, "0")).join(""); }
  function showProviderShare() {
    const shareButton = document.querySelector(".hero [data-open]");
    if (shareButton) shareButton.click();
  }
  function welcome(profile) {
    const safeProfile = { email: profile.email, name: profile.name, org: profile.org, role: profile.role };
    localStorage.setItem("secondServingSession", JSON.stringify(safeProfile));
    modal.classList.remove("open");
    document.querySelector("#memberBanner").hidden = true;
    document.querySelector("#joinCards").hidden = true;
    document.querySelector("#demoAccess").hidden = true;
    document.querySelector("#memberDashboard").hidden = false;
    document.querySelector("#memberRoleLabel").textContent = `YOUR ${roles[safeProfile.role].label.toUpperCase()} SPACE`;
    document.querySelector("#memberRoleTitle").textContent = `Welcome back, ${safeProfile.name}.`;
    document.querySelector("#memberRoleIntro").textContent = safeProfile.role === "provider" ? "Publish surplus, review your listings, and keep pickup details up to date." : safeProfile.role === "ngo" ? "Find nearby food, check safe pickup windows, and coordinate collections for your organization." : "Browse nearby pickup opportunities and keep your volunteer impact record in one place.";
    document.querySelector("#memberRoleAction").textContent = safeProfile.role === "provider" ? "Share surplus food ↗" : safeProfile.role === "ngo" ? "Find food for my organization ↗" : "Browse volunteer pickups ↗";
    document.querySelector("#memberRoleAction").onclick = safeProfile.role === "provider" ? showProviderShare : () => document.querySelector("#discover").scrollIntoView({ behavior: "smooth" });
    navAction.textContent = safeProfile.role === "ngo" ? "Find surplus ↗" : safeProfile.role === "volunteer" ? "Find a pickup ↗" : "Share surplus ↗";
  }
  navAction.addEventListener("click", () => {
    let session = null;
    try { session = JSON.parse(localStorage.getItem("secondServingSession") || "null"); } catch { /* Treat invalid session as signed out. */ }
    if (!session) open("provider", "join");
    else if (session.role === "provider") showProviderShare();
    else document.querySelector("#discover").scrollIntoView({ behavior: "smooth" });
  });  const workflowData = [
    { title: "Understand what\nyour kitchen uses.", body: "Bring sales, guest counts, and inventory together to build a clearer picture of daily demand.", values: ["146", "4"], labels: ["average daily meals", "connected signals"] },
    { title: "See the extra\nbefore it happens.", body: "Historical usage and changing demand help kitchens plan portions, prepare pickups, and get food moving earlier.", values: ["38", "4:30"], labels: ["servings likely spare", "suggested share time"] },
    { title: "Get the right people\nready to collect.", body: "A timely alert shares quantity, location, and safe pickup window with nearby partners who can help.", values: ["3", "12 min"], labels: ["nearby partners alerted", "typical first response"] },
    { title: "Keep good food\nmoving locally.", body: "Confirm the handoff, let the donor know it’s collected, and make every rescued serving count.", values: ["24", "100%"], labels: ["servings on this pickup", "handoff tracked"] },
  ];
  document.querySelector("#memberSignout").addEventListener("click", () => { localStorage.removeItem("secondServingSession"); document.querySelector("#memberDashboard").hidden = true; document.querySelector("#joinCards").hidden = false; document.querySelector("#demoAccess").hidden = false; navAction.textContent = "Share surplus ↗"; });
  const flowSteps = [...document.querySelectorAll(".flow .step")], forecastPanel = document.querySelector(".forecast-panel");
  flowSteps.forEach((step, index) => { step.setAttribute("role", "button"); step.tabIndex = 0; step.setAttribute("aria-pressed", String(step.classList.contains("active"))); const select = () => { flowSteps.forEach((item, i) => { item.classList.toggle("active", i === index); item.setAttribute("aria-pressed", String(i === index)); }); const data = workflowData[index]; forecastPanel.querySelector("h3").textContent = data.title; forecastPanel.querySelector("p").textContent = data.body; forecastPanel.querySelectorAll(".stats strong").forEach((node, i) => node.textContent = data.values[i]); forecastPanel.querySelectorAll(".stats span").forEach((node, i) => node.textContent = data.labels[i]); forecastPanel.querySelector(".tiny").textContent = `${step.querySelector("b").textContent.toUpperCase()} · DEMO DATA`; }; step.addEventListener("click", select); step.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); } }); });
  async function signIn(email, password, role) { const demo = roles[role]; if (demo.email === email.toLowerCase() && demo.password === password) { welcome({ email: demo.email, name: demo.label, role }); return true; } const users = JSON.parse(localStorage.getItem("secondServingUsers") || "[]"), digest = await hash(password), user = users.find(item => item.email.toLowerCase() === email.toLowerCase() && item.role === role && item.hash === digest); if (user) { welcome({ email: user.email, name: user.name, org: user.org, role: user.role }); return true; } return false; }
  document.querySelectorAll("[data-join]").forEach(button => button.addEventListener("click", () => open(button.dataset.join, "join")));
  document.querySelectorAll("[data-demo]").forEach(button => button.addEventListener("click", () => { const role = roles[button.dataset.demo]; setRole(button.dataset.demo); signIn(role.email, role.password, button.dataset.demo); }));
  switcher.addEventListener("click", () => setMode(mode === "join" ? "login" : "join"));
  document.querySelector(".auth-modal .close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", event => { if (event.target === modal) modal.classList.remove("open"); });
  form.addEventListener("submit", async event => { event.preventDefault(); const data = new FormData(form), email = String(data.get("email")).trim(), password = String(data.get("password")); const error = document.querySelector("#authError"); error.hidden = true;
    if (mode === "login") { if (!await signIn(email, password, selectedRole)) { error.textContent = "Those details don’t match this role. Check the email, password, and account type."; error.hidden = false; } return; }
    const users = JSON.parse(localStorage.getItem("secondServingUsers") || "[]"); if (users.some(user => user.email.toLowerCase() === email.toLowerCase() && user.role === selectedRole)) { error.textContent = "An account for this email and role already exists. Sign in instead."; error.hidden = false; return; }
    const user = { email, role: selectedRole, name: String(data.get("name")).trim(), org: String(data.get("organization")).trim(), hash: await hash(password) }; localStorage.setItem("secondServingUsers", JSON.stringify([...users, user])); welcome(user);
  });
  try { const session = JSON.parse(localStorage.getItem("secondServingSession") || "null"); if (session && roles[session.role]) welcome(session); } catch { localStorage.removeItem("secondServingSession"); }
})();
