/* Reversible phone-only enhancements; restores the original DOM on desktop. */
(() => {
  const phone = matchMedia('(max-width:767px)');
  let undo = [];
  function adapt() {
    undo.reverse().forEach(restore => restore()); undo = [];
    if (!phone.matches) return;
    document.querySelectorAll('main table').forEach((table, index) => {
      const records = table.rows.length > 1 && Array.from(table.rows).every(row => row.cells.length === 2 && Array.from(row.cells).every(cell => cell.colSpan === 1 && cell.rowSpan === 1));
      const region = document.createElement('div');
      const hint = document.createElement('p');
      region.className = 'mobile-table-region'; region.tabIndex = 0;
      region.setAttribute('role','region'); region.setAttribute('aria-label','Scrollable comparison table');
      hint.className = 'mobile-table-hint'; hint.id = 'mobile-table-hint-' + index;
      hint.textContent = 'Swipe to view the full table →'; region.setAttribute('aria-describedby',hint.id);
      if (records) {
        region.classList.add('mobile-record-region'); table.classList.add('mobile-record-table');
        region.removeAttribute('aria-describedby'); region.removeAttribute('tabindex'); region.setAttribute('aria-label','Product information');
        table.before(region);
      } else table.before(hint,region);
      region.append(table);
      undo.push(() => { region.replaceWith(table); hint.remove(); table.classList.remove('mobile-record-table'); });
    });
    // Split only at sentence boundaries, preserving every word and inline link.
    if (typeof Intl.Segmenter === 'function') {
      const sentences = new Intl.Segmenter('en', {granularity:'sentence'});
      document.querySelectorAll('main p').forEach(paragraph => {
        const text = paragraph.textContent;
        if (text.trim().length < 250 || paragraph.closest('table,form,figure,details') || paragraph.querySelector('button,input,svg,br,[id]')) return;
        const segments = Array.from(sentences.segment(text));
        const cuts = [0]; let length = 0;
        segments.forEach(segment => {
          if (length >= 100 && length + segment.segment.length > 235) { cuts.push(segment.index); length = 0; }
          length += segment.segment.length;
        });
        if (cuts.length === 1) return;
        cuts.push(text.length);
        const originals = Array.from(paragraph.childNodes);
        const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
        const nodes = []; let node, offset = 0;
        while ((node = walker.nextNode())) { nodes.push({node,start:offset,end:offset+node.length}); offset += node.length; }
        const pieces = cuts.slice(0,-1).map((start,index) => {
          const end = cuts[index+1];
          const first = nodes.find(n => n.end > start), last = nodes.find(n => n.end >= end);
          const range = document.createRange(); range.setStart(first.node,start-first.start); range.setEnd(last.node,end-last.start);
          const span = document.createElement('span'); span.className = 'mobile-reading-block'; span.append(range.cloneContents()); return span;
        });
        paragraph.replaceChildren(...pieces); paragraph.classList.add('mobile-reading-paragraph');
        undo.push(() => { paragraph.replaceChildren(...originals); paragraph.classList.remove('mobile-reading-paragraph'); });
      });
    }
    document.querySelectorAll('main li').forEach(item => {
      const first = item.firstChild;
      const existingLabel = item.firstElementChild;
      if (existingLabel && existingLabel.tagName === 'STRONG' && /^[A-Za-z][A-Za-z /&-]{2,42}:$/.test(existingLabel.textContent.trim()) && !item.closest('nav,form')) {
        existingLabel.classList.add('mobile-reading-label'); item.classList.add('mobile-labelled-item');
        undo.push(() => { existingLabel.classList.remove('mobile-reading-label'); item.classList.remove('mobile-labelled-item'); });
        return;
      }
      if (!first || first.nodeType !== Node.TEXT_NODE || item.closest('nav,form') || item.querySelector('ul,ol')) return;
      const match = first.textContent.match(/^\s*([A-Za-z][A-Za-z /&-]{2,42}:)(\s+)/);
      if (!match) return;
      const original = first.textContent;
      const label = document.createElement('span'); label.className = 'mobile-reading-label'; label.textContent = match[0];
      first.textContent = original.slice(match[0].length); item.prepend(label); item.classList.add('mobile-labelled-item');
      undo.push(() => { label.remove(); first.textContent = original; item.classList.remove('mobile-labelled-item'); });
    });
    const pair = document.querySelector('.ct-paired-fields');
    const more = document.querySelector('.ct-more-fields');
    if (pair && more) {
      const anchor = document.createComment('optional-original-position'); pair.before(anchor); more.prepend(pair);
      const summary = more.parentElement.querySelector('summary'); const original = summary.innerHTML;
      summary.firstChild.textContent = 'Add optional details ';
      undo.push(() => { anchor.replaceWith(pair); summary.innerHTML = original; });
    }
  }
  adapt(); phone.addEventListener('change',adapt);
})();
