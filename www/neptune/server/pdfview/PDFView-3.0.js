var PDFView={dataPDF:"",numPages:0,currPage:1,scale:1,LoadScroller:function(){if(sap.ui.Device.system.desktop==true){return}var e=document.getElementById("pdfWrapper");pdfScroll=new IScroll(e,{zoom:true,scrollbars:true,scrollX:true,scrollY:true})},ZoomOut:function(){PDFView.scale=parseFloat(PDFView.scale)+.25;PDFView.Render()},ZoomIn:function(){PDFView.scale=parseFloat(PDFView.scale)-.25;PDFView.Render()},MakeBinary:function(e){var t=window.atob(e);var n=t.length;var r=new Uint8Array(n);for(i=0;i<n;i++){r[i]=t.charCodeAt(i)}return r},RenderPage:function(e,t,n,r){t.getPage(n).then(function(t){var i=document.body.offsetWidth-30;var s=t.getViewport(i/t.getViewport(PDFView.scale).width);var o=s.width;var u=s.height;var a=document.getElementById("pdfScroller");a.style.width=s.width+30+"px";var f=document.createElement("div");f.id="Page"+n;f.className="pdfPage";f.style.width=i+"px";f.style.height=u+"px";e.appendChild(f);var l=document.createElement("canvas");var c=l.getContext("2d");var h=(i-s.width)/2;if(h<0){h=0}l.width=s.width;l.height=u;l.style.left=h+"px";f.appendChild(l);var p={canvasContext:c,viewport:s};t.render(p).then(r);var d=document.createElement("div");f.appendChild(d)})},Show:function(e){PDFView.dataPDF=e;PDFView.Render();if(typeof pdfScroll=="undefined"){PDFView.LoadScroller()}},AfterRender:function(){pdfScroll.refresh()},Render:function(){var e=document.getElementById("pdfScroller");if(e){while(e.hasChildNodes()){e.removeChild(e.lastChild)}}var t=PDFView.MakeBinary(PDFView.dataPDF);PDFJS.getDocument(t).then(function(t){var n=document.getElementById("pdfScroller");var r=1;PDFView.numPages=t.numPages;PDFView.RenderPage(n,t,r++,function i(){if(r>t.numPages){PDFView.AfterRender();return}PDFView.RenderPage(n,t,r++,i)})})}}