import{c as n}from"./app.6ec7fc21.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h3 id="\u66F4\u7B80\u5355\u7684\u6574\u8F68\u5207\u5206" tabindex="-1"><a class="header-anchor" href="#\u66F4\u7B80\u5355\u7684\u6574\u8F68\u5207\u5206" aria-hidden="true">#</a> \u66F4\u7B80\u5355\u7684\u6574\u8F68\u5207\u5206</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5207\u5206\u5F53\u524D\u76EE\u5F55\u4E0B\u7684\u6574\u8F68\u97F3\u9891</span>
<span class="token comment">#</span>
<span class="token comment"># \u9ED8\u8BA4\u8BBE\u7F6E\uFF1A</span>
<span class="token comment"># 1. \u5207\u5206 WAV \u6574\u8F68</span>
<span class="token comment"># 2. \u8F93\u51FA FLAC \u5206\u8F68</span>
<span class="token comment"># 3. \u5C06 CUE \u4E2D\u5143\u6570\u636E\u5BFC\u5165\u5230\u5207\u5206\u5B8C\u6210\u540E\u7684\u5206\u8F68\u6587\u4EF6</span>
<span class="token comment"># 4. \u5728\u5207\u5206\u6210\u529F\u540E\u5C06\u6574\u8F68\u548C CUE \u6587\u4EF6\u79FB\u52A8\u5230\u56DE\u6536\u7AD9</span>
<span class="token comment"># 5. \u5BFC\u5165\u76EE\u5F55\u4E2D jpg \u6587\u4EF6\u4F5C\u4E3A\u97F3\u9891\u5C01\u9762</span>
anni <span class="token function">split</span> <span class="token builtin class-name">.</span>

<span class="token comment"># \u5207\u5206 FLAC \u6574\u8F68</span>
anni <span class="token function">split</span> --input-format flac <span class="token builtin class-name">.</span>

<span class="token comment"># \u5207\u5206\u540E\u4E0D\u81EA\u52A8\u5220\u9664\u6574\u8F68\u548C CUE \u6587\u4EF6</span>
anni <span class="token function">split</span> --keep <span class="token builtin class-name">.</span>

<span class="token comment"># \u5207\u5206\u540E\u76F4\u63A5\u5220\u9664\u6574\u8F68\u548C CUE \u6587\u4EF6\uFF0C\u4E0D\u79FB\u52A8\u5230\u56DE\u6536\u7AD9</span>
anni <span class="token function">split</span> --no-trashcan <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="flac-\u4FE1\u606F\u67E5\u770B-\u5BFC\u51FA" tabindex="-1"><a class="header-anchor" href="#flac-\u4FE1\u606F\u67E5\u770B-\u5BFC\u51FA" aria-hidden="true">#</a> FLAC \u4FE1\u606F\u67E5\u770B/\u5BFC\u51FA</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B FLAC \u6587\u4EF6\u7684\u5143\u6570\u636E</span>
anni flac <span class="token builtin class-name">export</span> FILE.flac

<span class="token comment"># \u5BFC\u51FA FLAC \u6587\u4EF6\u7684\u5185\u7F6E\u5C01\u9762</span>
anni flac <span class="token builtin class-name">export</span> -t<span class="token operator">=</span>cover FILE.flac <span class="token operator">&gt;</span> cover.jpg
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,4);function p(l,c){return e}var i=s(a,[["render",p]]);export{i as default};
