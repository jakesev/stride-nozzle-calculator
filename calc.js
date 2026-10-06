(function(root) {
  'use strict';
  const LITRES_PER_US_GALLON = 3.785411784;
  const TIP_SIZES = [1,1.5,2,2.5,3,3.25,3.5,3.75,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,11,12,13,15,20,25,30,40,50,60];
  function positive(value, name) {
    if (value === '' || value === null || value === undefined) throw new Error('Enter '+name+'.');
    const n=Number(value);
    if (!Number.isFinite(n) || n <= 0) throw new Error(name+' must be a number greater than zero.');
    return n;
  }
  function parseTip(value) {
    let s=String(value).trim().replace(/^#/,'');
    if (/^0\d{2}$/.test(s)) return positive(Number(s)/10,'Tip size');
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)) throw new Error('Enter a size such as 2.5, or a three-digit code such as 025.');
    return positive(s,'Tip size');
  }
  function readMachine(flow, unit, count, maximum) {
    if (!['lpm','gpm'].includes(unit)) throw new Error('Choose L/min or US GPM.');
    const f=positive(flow,'Machine flow'), n=positive(count,'Number of tips'), max=positive(maximum,'Machine maximum pressure');
    if (!Number.isInteger(n) || n>12) throw new Error('Use a whole number of tips from 1 to 12.');
    if(f>1000 || max>50000) throw new Error('Check the machine units and rating: flow must be at most 1,000 and maximum pressure at most 50,000 PSI.');
    const gpm=unit==='lpm'?f/LITRES_PER_US_GALLON:f;
    return {flow:f,unit,count:n,max,gpm,lpm:gpm*LITRES_PER_US_GALLON};
  }
  function pressure(gpm,count,size) {return 4000*Math.pow(gpm/(count*size),2);}
  function choose(machine,targetValue) {
    const target=positive(targetValue,'Target pressure');
    if(target>machine.max) throw new Error('Target pressure exceeds your '+machine.max.toLocaleString('en-US')+' PSI machine maximum. Choose a lower target.');
    const total=machine.gpm*Math.sqrt(4000/target), each=total/machine.count;
    let below=TIP_SIZES.filter(s=>s<=each).at(-1), above=TIP_SIZES.find(s=>s>=each);
    let nearest=[below,above].filter((v,i,a)=>v!==undefined&&a.indexOf(v)===i);
    if(nearest.length===1 && Math.abs(nearest[0]-each)<1e-9) {
      const i=TIP_SIZES.indexOf(nearest[0]); if(i<TIP_SIZES.length-1) nearest.push(TIP_SIZES[i+1]);
    }
    return {target,total,each,nearest:nearest.map(size=>({size,pressure:pressure(machine.gpm,machine.count,size)}))};
  }
  const api={LITRES_PER_US_GALLON,TIP_SIZES,parseTip,readMachine,pressure,choose};
  root.NozzleMath=api;
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
