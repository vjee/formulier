import{_ as s,c as a,o as n,a2 as l}from"./chunks/framework.DSH6rtse.js";const u=JSON.parse('{"title":"useFormFieldValue()","description":"","frontmatter":{},"headers":[],"relativePath":"react/api/use-form-field-value.md","filePath":"react/api/use-form-field-value.md"}'),e={name:"react/api/use-form-field-value.md"},o=l(`<h1 id="useformfieldvalue" tabindex="-1"><code>useFormFieldValue()</code> <a class="header-anchor" href="#useformfieldvalue" aria-label="Permalink to &quot;\`useFormFieldValue()\`&quot;">​</a></h1><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki min-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">function</span><span style="color:#B392F0;"> useFormFieldValue&lt;</span></span>
<span class="line"><span style="color:#B392F0;">  V </span><span style="color:#F97583;">extends</span><span style="color:#B392F0;"> Values</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  P </span><span style="color:#F97583;">extends</span><span style="color:#B392F0;"> Primitives</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  F </span><span style="color:#F97583;">extends</span><span style="color:#79B8FF;"> string</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">&gt;(</span></span>
<span class="line"><span style="color:#B392F0;">  form</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> Formulier&lt;V</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> P&gt;</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  name</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> F</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  options</span><span style="color:#F97583;">?:</span><span style="color:#B392F0;"> FormFieldValueOptions&lt;V</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> F&gt;</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">)</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> UseFormFieldValueResult&lt;V</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> F&gt;</span></span></code></pre></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-jsx"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki min-dark vp-code" tabindex="0"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#B392F0;"> {useCreateForm</span><span style="color:#BBBBBB;">,</span><span style="color:#B392F0;"> useFormFieldValue} </span><span style="color:#F97583;">from</span><span style="color:#FFAB70;"> &#39;@formulier/react&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#B392F0;"> Component() {</span></span>
<span class="line"><span style="color:#F97583;">  const</span><span style="color:#79B8FF;"> form</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useCreateForm({</span></span>
<span class="line"><span style="color:#B392F0;">    initialValues</span><span style="color:#F97583;">:</span><span style="color:#B392F0;"> {name</span><span style="color:#F97583;">:</span><span style="color:#FFAB70;"> &#39;Jeff&#39;</span><span style="color:#B392F0;">}</span><span style="color:#BBBBBB;">,</span></span>
<span class="line"><span style="color:#B392F0;">  })</span></span>
<span class="line"><span style="color:#F97583;">  const</span><span style="color:#79B8FF;"> name</span><span style="color:#F97583;"> =</span><span style="color:#B392F0;"> useFormFieldValue(</span><span style="color:#FFAB70;">&#39;name&#39;</span><span style="color:#B392F0;">)</span></span>
<span class="line"><span style="color:#B392F0;">}</span></span></code></pre></div>`,4),p=[o];function t(r,c,B,i,F,y){return n(),a("div",null,p)}const m=s(e,[["render",t]]);export{u as __pageData,m as default};