/* Art-directed, lightweight projected SVG geometry. No scheduler or dependency.
   Keep geometry constants in sync with science_atlas_geometry.py. */
(function () {
  'use strict';
  const SEGMENTS=28, SUBDIVISIONS=4, RUNGS=18, TURNS=2.08;
  const LENGTH=662, RADIUS=73, WIDTH=29, DEPTH=6.6, PHASE=-.72;
  const AXIS=Math.PI/6, CAMERA=1060, PREFIX='sunson-atlas';
  const CA=Math.cos(AXIS), SA=Math.sin(AXIS), TAU=Math.PI*2;
  const WINDING=RADIUS*TURNS*TAU/LENGTH, NORM=Math.sqrt(1+WINDING*WINDING);
  const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  const scale=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
  const number=v=>(Math.abs(v)<.0005?0:v).toFixed(3);
  function path(points,closed=true){
    return 'M'+points.map(p=>{
      const k=CAMERA/(CAMERA-p[2]);
      return number(450+(p[0]*CA-p[1]*SA)*k)+' '+number(310+(p[0]*SA+p[1]*CA)*k);
    }).join(' L')+(closed?' Z':'');
  }
  function frame(t,strand,angle){
    const phi=PHASE+t*TURNS*TAU+strand*Math.PI+angle,c=Math.cos(phi),s=Math.sin(phi);
    return [[LENGTH*(t-.5),RADIUS*c,RADIUS*s],[0,c,s],[-WINDING/NORM,-s/NORM,c/NORM]];
  }
  function corner(f,w,d){return add(add(f[0],scale(f[2],w*WIDTH/2)),scale(f[1],d*DEPTH/2));}
  function band(strand,segment,angle,order){
    const frames=[];
    for(let j=0;j<=SUBDIVISIONS;j++)frames.push(frame((segment+j/SUBDIVISIONS)/SEGMENTS,strand,angle));
    const mid=frame((segment+.5)/SEGMENTS,strand,angle);
    const facing=mid[1][2]>=0?1:-1,side=mid[2][2]>=0?1:-1;
    const reverse=[...frames].reverse();
    const main=frames.map(f=>corner(f,-1,facing)).concat(reverse.map(f=>corner(f,1,facing)));
    const edge=frames.map(f=>corner(f,side,-1)).concat(reverse.map(f=>corner(f,side,1)));
    const shine=frames.map(f=>corner(f,side,facing));
    const depth=mid[0][2],near=(depth/RADIUS+1)/2,lighting=Math.abs(mid[1][2]);
    const front=depth>=-5;
    return {id:'band-'+strand+'-'+segment,depth,order,faces:[
      {face:'main',d:path(main),fill:'url(#'+PREFIX+'-band-'+(front?'front':'back')+')','fill-opacity':number(.43+.27*near+.14*lighting),stroke:front?'#d7e8af':'#8aa97c','stroke-opacity':number(.13+.16*near),'stroke-width':'.45'},
      {face:'edge',d:path(edge),fill:front?'#8eac76':'#456c50','fill-opacity':number(.50+.26*near),stroke:'none'},
      {face:'shine',d:path(shine,false),fill:'none',stroke:'#f0f7d6','stroke-opacity':number(.13+.36*near+.13*lighting),'stroke-width':'.9'}
    ]};
  }
  function rung(index,angle,order){
    const t=.045+index*.91/(RUNGS-1),phi=PHASE+t*TURNS*TAU+angle,c=Math.cos(phi),s=Math.sin(phi);
    const center=[LENGTH*(t-.5),0,0],radial=[0,c,s],normal=[0,-s,c],facing=normal[2]>=0?1:-1;
    const a=add(add(center,scale(radial,-(RADIUS-7))),scale(normal,facing*2.2));
    const b=add(add(center,scale(radial,RADIUS-7)),scale(normal,facing*2.2));
    const w=[4.3,0,0],points=[add(a,scale(w,-1)),add(b,scale(w,-1)),add(b,w),add(a,w)];
    return {id:'bridge-'+index,depth:points.reduce((sum,p)=>sum+p[2],0)/points.length,order,faces:[
      {face:'main',d:path(points),fill:'url(#'+PREFIX+'-bridge)','fill-opacity':number(.42+.18*Math.abs(c)),stroke:'#d5e8ac','stroke-opacity':'.16','stroke-width':'.5'},
      {face:'shine',d:path([add(a,scale(w,-1)),add(b,scale(w,-1))],false),fill:'none',stroke:'#eff5d0','stroke-opacity':number(.24+.20*Math.abs(c)),'stroke-width':'.75'}
    ]};
  }
  function cap(strand,end,angle,order){
    const f=frame(end,strand,angle),points=[corner(f,-1,-1),corner(f,1,-1),corner(f,1,1),corner(f,-1,1)];
    return {id:'cap-'+strand+'-'+end,depth:points.reduce((sum,p)=>sum+p[2],0)/points.length+.1,order,faces:[
      {face:'main',d:path(points),fill:'#dbeab2','fill-opacity':'.67',stroke:'#f2f8d5','stroke-opacity':'.58','stroke-width':'.65'}
    ]};
  }
  function model(angle){
    const pieces=[];
    for(let strand=0;strand<2;strand++)for(let s=0;s<SEGMENTS;s++)pieces.push(band(strand,s,angle,pieces.length));
    for(let i=0;i<RUNGS;i++)pieces.push(rung(i,angle,pieces.length));
    for(let strand=0;strand<2;strand++)for(let end=0;end<2;end++)pieces.push(cap(strand,end,angle,pieces.length));
    return pieces.sort((a,b)=>(a.depth-b.depth)||(a.order-b.order));
  }
  function create(svg){
    if(!svg?.matches?.('[data-atlas-helix]'))throw new TypeError('Expected the complete data-atlas-helix SVG.');
    let layer=svg.querySelector('[data-atlas-mesh]'),nodes=new Map(),destroyed=false,lastAngle=null;
    if(!layer)throw new Error('Missing atlas mesh layer.');
    for(const group of layer.querySelectorAll('[data-atlas-piece]')){
      const faces=new Map();
      for(const element of group.querySelectorAll('[data-atlas-face]'))faces.set(element.getAttribute('data-atlas-face'),element);
      nodes.set(group.getAttribute('data-atlas-piece'),{group,faces});
    }
    if(nodes.size!==SEGMENTS*2+RUNGS+4)throw new Error('Incomplete atlas mesh.');
    function render(angleRadians){
      if(destroyed)return;
      if(!Number.isFinite(angleRadians))throw new TypeError('Helix angle must be finite radians.');
      if(angleRadians===lastAngle)return;
      const pieces=model(angleRadians);
      for(let index=0;index<pieces.length;index++){
        const p=pieces[index],node=nodes.get(p.id);
        for(const face of p.faces){
          const el=node.faces.get(face.face);
          for(const key in face){
            if(key==='face')continue;
            if(el.getAttribute(key)!==face[key])el.setAttribute(key,face[key]);
          }
        }
        // Existing groups only: update painter order when depth order changed.
        const current=layer.children[index];
        if(current!==node.group)layer.insertBefore(node.group,current||null);
      }
      lastAngle=angleRadians;
    }
    function destroy(){destroyed=true;nodes.clear();layer=null;svg=null;}
    return Object.freeze({render,destroy});
  }
  window.SUNSONHelixModel=Object.freeze({create});
})();
