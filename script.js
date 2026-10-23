const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.style.width=e.target.dataset.width+'%';ob.unobserve(e.target)}}),{threshold:.2});document.querySelectorAll('.bar i').forEach(x=>ob.observe(x));const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.cards article,.stat,.video,.refs a').forEach(x=>{x.classList.add('reveal');reveal.observe(x)})}else{document.querySelectorAll('.bar i').forEach(x=>x.style.width=x.dataset.width+'%')}
const story=`Welcome to Beyond the Backpack, a student research project about school bag weight, carrying habits, and students' reported experiences. Every school day, students carry notebooks, paper, books, and other supplies. Our survey found that 96.2 percent of respondents reported carrying notebooks or paper, and 38.5 percent said they sometimes brought materials they did not use. Could checking the daily timetable help students avoid carrying unnecessary items? Physics gives us useful concepts. Weight is the gravitational force acting on mass. Torque describes a turning effect, and the distance between a load and a pivot matters. Work can be estimated when a load is lifted through a known height. However, our questionnaire collected self-reported answers; it did not directly measure spinal loading, torque, or injury. Respondents reported shoulder discomfort, and 42.3 percent identified walking while carrying a bag as the activity causing greatest difficulty. These reports deserve attention, but they do not prove the bag caused the discomfort. Many respondents were willing to consider classroom storage or lockers. Our proposed next step is to try practical measures, then measure bag mass before and after. The goal is to replace assumptions with evidence.`;
const status=document.getElementById('audioStatus');function speak(){if(!('speechSynthesis'in window)){status.textContent='Speech narration is not supported by this browser.';return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(story);u.rate=.94;u.onstart=()=>status.textContent='Narration is playing. Use Stop to end it.';u.onend=()=>status.textContent='Narration finished.';speechSynthesis.speak(u)}document.getElementById('playNarration')?.addEventListener('click',speak);document.getElementById('readPage')?.addEventListener('click',speak);document.getElementById('stopNarration')?.addEventListener('click',()=>{speechSynthesis?.cancel();if(status)status.textContent='Narration stopped.'});
// Local preview controls for the visual and audio placeholders in each tab.
document.querySelectorAll('.media-slots').forEach((group)=>{
  const visualInput=group.querySelector('.visual-input');
  const visualPreview=group.querySelector('.visual-preview');
  const audioInput=group.querySelector('.audio-input');
  const audioPreview=group.querySelector('.audio-preview');
  let oldImageUrl=null, oldAudioUrl=null;
  visualInput?.addEventListener('change',()=>{
    const file=visualInput.files?.[0]; if(!file) return;
    if(oldImageUrl) URL.revokeObjectURL(oldImageUrl);
    oldImageUrl=URL.createObjectURL(file);
    visualPreview.replaceChildren();
    const img=document.createElement('img'); img.src=oldImageUrl; img.alt=file.name;
    const name=document.createElement('strong'); name.textContent=file.name;
    visualPreview.append(img,name);
  });
  audioInput?.addEventListener('change',()=>{
    const file=audioInput.files?.[0]; if(!file) return;
    if(oldAudioUrl) URL.revokeObjectURL(oldAudioUrl);
    oldAudioUrl=URL.createObjectURL(file);
    audioPreview.replaceChildren();
    const player=document.createElement('audio'); player.controls=true; player.preload='metadata'; player.src=oldAudioUrl;
    const name=document.createElement('strong'); name.textContent=file.name;
    audioPreview.append(name,player);
  });
});
