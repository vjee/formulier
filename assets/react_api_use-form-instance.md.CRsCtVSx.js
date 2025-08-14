import{_ as n,c as a,o,ae as l}from"./chunks/framework.TzpCcjju.js";const y=JSON.parse('{"title":"useFormInstance()","description":"","frontmatter":{},"headers":[],"relativePath":"react/api/use-form-instance.md","filePath":"react/api/use-form-instance.md"}'),p={name:"react/api/use-form-instance.md"};function e(t,s,c,r,F,i){return o(),a("div",null,s[0]||(s[0]=[l(`<h1 id="useforminstance" tabindex="-1"><code>useFormInstance()</code> <a class="header-anchor" href="#useforminstance" aria-label="Permalink to &quot;\`useFormInstance()\`&quot;">​</a></h1><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki min-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#B392F0;"> {Form</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> useFormInstance} </span><span style="color:#F97583;">from</span><span style="color:#FFAB70;"> &#39;@formulier/react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#B392F0;"> Component() {</span></span>
<span class="line"><span style="color:#F97583;">  const</span><span style="color:#79B8FF;"> form</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useCreateForm({</span></span>
<span class="line"><span style="color:#B392F0;">    initialValues</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> {name</span><span style="color:#F97583;">:</span><span style="color:#FFAB70;"> &#39;Jeff&#39;</span><span style="color:#B392F0;">}</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">  return</span><span style="color:#B392F0;"> (</span></span>
<span class="line"><span style="color:#B392F0;">    &lt;</span><span style="color:#79B8FF;">Form</span><span style="color:#B392F0;"> form</span><span style="color:#F97583;">=</span><span style="color:#B392F0;">{form}&gt;</span></span>
<span class="line"><span style="color:#B392F0;">      &lt;</span><span style="color:#79B8FF;">SubComponent</span><span style="color:#B392F0;"> /&gt;</span></span>
<span class="line"><span style="color:#B392F0;">    &lt;/</span><span style="color:#79B8FF;">Form</span><span style="color:#B392F0;">&gt;</span></span>
<span class="line"><span style="color:#B392F0;">  )</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#B392F0;"> SubComponent({name</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> label}) {</span></span>
<span class="line"><span style="color:#F97583;">  const</span><span style="color:#79B8FF;"> form</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useFormInstance()</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span></code></pre></div>`,2)]))}const m=n(p,[["render",e]]);export{y as __pageData,m as default};
