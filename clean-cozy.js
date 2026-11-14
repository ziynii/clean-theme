(function(){const keys=['gray','pink','yellow','blue','green','purple'];const last=window.__ccLastPalette;const list=keys.filter(x=>x!==last);const pick=list[Math.floor(Math.random()*list.length)];window.__ccLastPalette=pick;window.__ccNextPalette=pick;})();
(()=>{
'use strict';
const ID='zeta-clean-cozy-v41';
const VERSION=41;
const PALETTES={"gray":{"ko":"그레이","bg":"#F7F7F8","user":"#F1F1F3","accent":"#A7ABB1","strong":"#4B5057","soft":"#EEEFF1","hover":"#E3E5E8","stroke":"#E1E3E6","icon":"#737780","scroll":"#C8CBD0","alt":"#FAFAFB"},"pink":{"ko":"연핑크","bg":"#FCF8FA","user":"#F8EDF1","accent":"#D8B7C5","strong":"#8D6576","soft":"#F7EDF2","hover":"#F0E1E8","stroke":"#EEDFE5","icon":"#9B7B88","scroll":"#DFC9D2","alt":"#FFFBFC"},"yellow":{"ko":"연노랑","bg":"#FCFBF5","user":"#F9F4E3","accent":"#D8C89A","strong":"#8B7951","soft":"#F7F3E5","hover":"#F0EAD7","stroke":"#EBE5D1","icon":"#98855D","scroll":"#DDD4B6","alt":"#FFFEF9"},"blue":{"ko":"연파랑","bg":"#F7FAFD","user":"#ECF3FA","accent":"#B3CDE3","strong":"#587B9B","soft":"#EDF4FA","hover":"#E1EDF7","stroke":"#DDE9F2","icon":"#7895AE","scroll":"#C8D9E8","alt":"#FBFDFF"},"green":{"ko":"연두","bg":"#F8FBF7","user":"#EFF6EA","accent":"#BED3B2","strong":"#6B8961","soft":"#F0F7EC","hover":"#E4EFE0","stroke":"#DFEADD","icon":"#81997B","scroll":"#CDDCC7","alt":"#FBFDFB"},"purple":{"ko":"연보라","bg":"#FAF8FD","user":"#F2EDFA","accent":"#C9B9E1","strong":"#7E6A9C","soft":"#F3EEFA","hover":"#EAE2F5","stroke":"#E7E0EF","icon":"#9485AB","scroll":"#D7CBE5","alt":"#FDFBFF"}};
const chosen=window.__ccNextPalette;
try{delete window.__ccNextPalette;}catch(e){}
const chosenKey=PALETTES[chosen]?chosen:'gray';
const palette=PALETTES[chosenKey];
const accentRgb=[1,3,5].map(i=>parseInt(palette.accent.slice(i,i+2),16)).join(',');
const KEY='__zetaCleanCozy';
const STORE='zeta-clean-cozy-options-v1';
if(!/(^|\.)zeta-ai\.io$/.test(location.hostname)) { alert('제타에서 실행해 줘!'); return; }
if(window[KEY]?.stop){
 const previous=window[KEY];
 previous.stop();
 /* Replace previous instance, including another color of this version. */
}
document.getElementById(ID)?.remove();
const defaults={avatarMode:'both',dialogueHighlight:false};
let settings={...defaults};
try{
 const saved=JSON.parse(localStorage.getItem(STORE)||'{}');
 const allowed=['both','none','userHidden','userHiddenHeart'];
 settings.avatarMode=allowed.includes(saved.avatarMode)?saved.avatarMode:(saved.avatar===false?'none':'both');
 // Start with dialogue highlighting OFF on every fresh load, regardless of older stored preferences.
 settings.dialogueHighlight=false;
}catch(e){}
const style=document.createElement('style');
style.id=ID;
style.textContent=`
:root{--cc-accent:${palette.accent};--cc-accent-strong:${palette.strong};--cc-accent-soft:${palette.soft};--cc-accent-hover:${palette.hover};--cc-bg:${palette.bg};--cc-panel:#FFFFFF;--cc-user:${palette.user};--cc-text:#292B30;--cc-muted:#72767E;--cc-stroke:${palette.stroke};--cc-icon:${palette.icon};--cc-scroll:${palette.scroll};--cc-panel-alt:${palette.alt}}
html,body,#__next,main#contents{background:var(--cc-bg)!important;color:var(--cc-text)!important}
header[data-sentry-component="Header"]{background:rgba(255,255,255,.94)!important;background-image:none!important;border-bottom:1px solid var(--cc-stroke)!important;box-shadow:none!important}
header[data-sentry-component="Header"] :is(span,svg){color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important}
header[data-sentry-component="Header"] [data-testid="chat-header-model"]{background:#F4F4F4!important;border:1px solid var(--cc-stroke)!important}
header[data-sentry-component="Header"] [data-testid="chat-header-model"] svg{color:#6D7276!important}
[data-sentry-component="ChatRoomReadyView"],
[role="log"][aria-label="Chat messages"]{background:#FFFFFF!important;background-image:none!important}
[data-sentry-component="ChatRoomReadyView"]>div:first-child,
[data-sentry-component="ChatRoomReadyView"]>div[aria-hidden="true"]{background:rgba(255,255,255,.94)!important;background-image:none!important}
[data-sentry-component="LeftTextContent"], [data-sentry-component="RightTextContent"],
[data-sentry-component="LeftTextContent"]>div,[data-sentry-component="RightTextContent"]>div{background:transparent!important;background-image:none!important}
[data-sentry-component="LeftTextContent"] .caption1,[data-sentry-component="RightTextContent"] .caption1{color:var(--cc-muted)!important}
[data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"],
[data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 border:1px solid var(--cc-stroke)!important;border-radius:18px!important;
 background:#FFFFFF!important;color:var(--cc-text)!important;
 box-shadow:none!important;position:relative!important;overflow:visible!important;
 max-width:min(612px,100%)!important;padding:12px 14px!important;
}
/* 캐릭터 메시지는 테두리 없이 */
[data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 border:0!important;
}
/* 유저 메시지는 원래보다 조금 더 각지게 */
[data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 background:var(--cc-user)!important;border-color:#F0F0EF!important;
 border-radius:10px!important;
}
/* 채팅방 상단: 이름을 정확히 중앙에, 모델 선택 버튼 숨김 */
body:has([data-sentry-component="ChatRoomReadyView"]) header[data-sentry-component="Header"] nav{
 position:relative!important;
}
body:has([data-sentry-component="ChatRoomReadyView"]) header[data-sentry-component="Header"] [data-testid="chat-header-model"]{
 display:none!important;
}
body:has([data-sentry-component="ChatRoomReadyView"]) header[data-sentry-component="Header"] [data-testid="chat-header-profile"]{
 position:absolute!important;
 left:50%!important;
 top:50%!important;
 transform:translate(-50%,-50%)!important;
 flex:none!important;
 width:max-content!important;
 max-width:calc(100% - 160px)!important;
 min-width:0!important;
 justify-content:center!important;
 text-align:center!important;
 z-index:1!important;
}
body:has([data-sentry-component="ChatRoomReadyView"]) header[data-sentry-component="Header"] [data-testid="chat-header-profile"] span{
 text-align:center!important;
}
body:has([data-sentry-component="ChatRoomReadyView"]) header[data-sentry-component="Header"] nav > div:last-child{
 margin-left:auto!important;
 z-index:2!important;
}

[data-sentry-component="ChatBubbleContainer"]::before,
[data-sentry-component="ChatBubbleContainer"]::after{content:none!important;display:none!important}
[data-sentry-component="ChatBubbleContainer"] .chat,
[data-sentry-component="ChatBubbleContainer"] .chat p,
[data-sentry-component="ChatBubbleContainer"] .chat :not(em):not(i){color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important}
[data-sentry-component="ChatBubbleContainer"] .chat :is(em,i){color:#96999D!important;-webkit-text-fill-color:#96999D!important;font-style:italic!important;opacity:1!important}
[data-sentry-component="ChatBubbleContainer"] blockquote>div.w-1{background:#B8BBC0!important}
.cc-meta{display:flex;align-items:baseline;gap:7px;min-width:0;margin:0 0 7px 0;line-height:1.35;user-select:none}
.cc-meta-name{font-size:12px;font-weight:650;color:#282B2F;white-space:nowrap;max-width:200px;overflow:hidden;text-overflow:ellipsis}
.cc-meta-time{font-size:11px;color:#999CA0;white-space:nowrap}
.cc-name-hidden{display:none!important}
.cc-avatar-hidden [data-sentry-component="LeftTextContent"]>button.shrink-0,
.cc-avatar-hidden [data-sentry-component="RightTextContent"]>button.shrink-0{display:none!important}
.cc-avatar-hidden [data-sentry-component="LeftTextContent"]{padding-right:14px!important;padding-left:14px!important}
.cc-avatar-hidden [data-sentry-component="RightTextContent"]{padding-left:14px!important;padding-right:14px!important}
.cc-avatar-hidden [data-sentry-component="RightTextContent"]>div{margin-left:auto!important}
[data-sentry-component="NarratorBubble"] .message-context-menu-trigger,
.message-context-menu-trigger:has(svg[data-sentry-source-file="NarratorBubble.tsx"]){background:#F8F8F8!important;border:1px solid var(--cc-stroke)!important;border-radius:14px!important;box-shadow:none!important}
[data-sentry-component="NarratorBubble"] .chat,
[data-sentry-component="NarratorBubble"] .chat *,
.message-context-menu-trigger:has(svg[data-sentry-source-file="NarratorBubble.tsx"]) .chat *{color:#868A8E!important;-webkit-text-fill-color:#868A8E!important}
[data-sentry-component="NarratorBubble"] svg[data-sentry-source-file="NarratorBubble.tsx"]{color:#90959A!important}
[data-testid="chat-bottom-dock"],[data-sentry-component="ChatComposer"],
[data-sentry-component="ChatComposer"]>div{background:transparent!important;background-image:none!important;box-shadow:none!important;--tw-gradient-from:transparent!important;--tw-gradient-to:transparent!important}
[data-testid="composer-input-box"]{background:#FFFFFF!important;background-image:none!important;border:1px solid #DEDFE0!important;border-radius:20px!important;box-shadow:0 2px 10px rgba(0,0,0,.045)!important}
[data-testid="composer-input-box"] textarea[name="message"]{background:transparent!important;color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important}
[data-testid="composer-input-box"] textarea[name="message"]::placeholder{color:#9A9DA0!important;-webkit-text-fill-color:#9A9DA0!important}
[data-testid="chat-send-button"]{background:#292B2D!important;color:#FFFFFF!important}
[data-testid="chat-send-button"] svg{color:#FFFFFF!important}
[data-sentry-component="QuickReplyPanel"],[data-sentry-component="QuickReplyRegenControlBar"]{background:#FAFAFA!important;border-color:var(--cc-stroke)!important;background-image:none!important}
[data-sentry-component="QuickReplySetSlide"]>button{background:#FFFFFF!important;border:1px solid var(--cc-stroke)!important;border-radius:15px!important;box-shadow:none!important}
[data-sentry-component="QuickReplySetSlide"] .chat,
[data-sentry-component="QuickReplySetSlide"] .chat p{color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important}
[data-sentry-component="QuickReplySetSlide"] .chat :is(em,i){color:#93979B!important;-webkit-text-fill-color:#93979B!important}
[data-sentry-component="LastMessageControlBar"] button[aria-label],
[data-sentry-component="SnapshotButton"]>button{background:rgba(255,255,255,.92)!important;border:1px solid var(--cc-stroke)!important;color:#676A6E!important;box-shadow:none!important}
[data-sentry-component="LastMessageControlBar"] button[aria-label] :is(svg,span),
[data-sentry-component="SnapshotButton"]>button :is(svg,span){color:#676A6E!important;-webkit-text-fill-color:#676A6E!important}
[data-sentry-component="SnapshotButton"]>button,
[data-sentry-component="SnapshotButton"]>button span{white-space:nowrap!important}
[data-sentry-component="InfoBoxContent"],[data-sentry-component="InfoBoxExpandedContent"],
[data-sentry-component="InfoBoxCharacterSection"]{background:#FFFFFF!important;background-image:none!important;color:var(--cc-text)!important;border-color:var(--cc-stroke)!important}
[data-sentry-component="InfoBoxContent"] .chat,[data-sentry-component="InfoBoxExpandedContent"] .chat{color:var(--cc-text)!important}
body:has([data-sentry-component="MyPlotChatProfileEdit"]) [data-sentry-component="MyPlotChatProfileEdit"]{background:#FAFAFA!important;color:var(--cc-text)!important}
[data-sentry-component="MyPlotChatProfileEdit"] :is(input[name="name"],textarea[name="description"]){background:#FFFFFF!important;color:var(--cc-text)!important;border:1px solid var(--cc-stroke)!important;border-radius:12px!important}
[data-sentry-component="RoomList"]{color:var(--cc-text)!important}
a[testid^="room-list-item-"] span.line-clamp-1,
a[href^="/ko/rooms/"] span.line-clamp-1{color:#75797E!important;-webkit-text-fill-color:#75797E!important;opacity:1!important}
a[testid^="room-list-item-"] span.body1{color:#25272A!important;-webkit-text-fill-color:#25272A!important}
[data-sentry-component="ScrappedPlotsPreview"] a.caption1,
[data-sentry-component="ScrappedPlotsPreview"] a span.caption1{color:#74787C!important;-webkit-text-fill-color:#74787C!important}
[data-sentry-source-file="Select.tsx"].body2,[data-sentry-source-file="Select.tsx"].text-gray-200{color:#5B6065!important;-webkit-text-fill-color:#5B6065!important}
#cc-toggle{position:fixed;z-index:2147483000;bottom:102px;left:12px;width:33px;height:33px;display:flex;align-items:center;justify-content:center;background:#FFFFFF;color:#45484C;border:1px solid #DDDFE0;border-radius:50%;font:18px/1 sans-serif;box-shadow:0 2px 8px #00000015;cursor:pointer}
#cc-panel{position:fixed;z-index:2147483001;bottom:143px;left:12px;width:210px;padding:13px;border:1px solid #E4E5E6;border-radius:14px;background:#FFFFFF;color:#292B2D;box-shadow:0 8px 25px #0000001A;font:13px/1.5 sans-serif}
#cc-panel[hidden]{display:none!important}
#cc-panel .cc-heading{font-size:13px;font-weight:700;margin-bottom:9px}
#cc-panel label{display:flex;gap:9px;align-items:center;margin:8px 0;cursor:pointer}
#cc-panel input{accent-color:#484C51}

/* Reference-inspired narrow, centered message column on larger screens */
[role="log"][aria-label="Chat messages"] [data-sentry-component="BodyView"],
[role="log"][aria-label="Chat messages"] [data-sentry-component="NarratorBubble"],
[role="log"][aria-label="Chat messages"] [data-sentry-component="LastMessageControlBar"]{
  width:100%!important;
  max-width:610px!important;
  margin-left:auto!important;
  margin-right:auto!important;
  box-sizing:border-box!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="ChatBubbleContainer"]{
  max-width:100%!important;
}
/* Assistant-side text should read like a clean chat transcript, not a full-width colored card */
[data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"]{
  background:transparent!important;
  border:none!important;
  border-radius:0!important;
  box-shadow:none!important;
  padding:8px 10px 10px!important;
}
[data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
  max-width:min(100%,430px)!important;
  border:none!important;
  border-radius:10px!important;
  padding:11px 13px!important;
  background:#F5F5F5!important;
}
/* Name and body typography follow the supplied minimal chat reference */
.cc-meta{gap:5px!important;margin-bottom:5px!important;align-items:baseline!important;}
.cc-meta-name{font-family:inherit!important;font-size:13px!important;font-weight:600!important;letter-spacing:-.015em!important;line-height:1.4!important;}
.cc-meta-time{font-family:inherit!important;font-size:11px!important;font-weight:400!important;line-height:1.4!important;}
[data-sentry-component="ChatBubbleContainer"] .chat,
[data-sentry-component="ChatBubbleContainer"] .chat p{
  font-family:inherit!important;font-size:13.5px!important;
  font-weight:400!important;line-height:1.55!important;
  letter-spacing:-.01em!important;
}
[data-sentry-component="ChatBubbleContainer"] .chat :is(em,i){
  font-size:inherit!important;font-weight:400!important;
}
/* Don't give the content column desktop-sized margins on mobile. */
@media(max-width:640px){
  [role="log"][aria-label="Chat messages"] [data-sentry-component="BodyView"],
  [role="log"][aria-label="Chat messages"] [data-sentry-component="NarratorBubble"]{
    max-width:100%!important;
  }
  [data-sentry-component="ChatBubbleContainer"] .chat,
  [data-sentry-component="ChatBubbleContainer"] .chat p{font-size:14px!important;}
}
/* Hide native shortcuts only while the theme's settings menu can forward clicks */
html.cc-tools-ready [data-sentry-component="LastMessageControlBar"]{display:none!important;}
html.cc-tools-ready [data-sentry-component="QuickReplyButton"]{display:none!important;}
#cc-panel{width:255px!important;max-width:calc(100vw - 24px)!important;max-height:min(68vh,470px)!important;overflow:auto!important;}
#cc-panel .cc-section-title{font-size:11px;font-weight:600;color:#8D9196;letter-spacing:.02em;margin:12px 0 6px;}
#cc-panel .cc-action-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;}
#cc-panel .cc-action{width:100%;min-width:0;min-height:36px;padding:7px 8px;border:1px solid #ECEDEE;border-radius:9px;
  background:#FAFAFA;color:#33363A;font:12px/1.25 sans-serif;text-align:center;cursor:pointer;}
#cc-panel .cc-action:disabled{color:#B4B6B9;cursor:not-allowed;opacity:.65;}
#cc-panel .cc-action:not(:disabled):active{background:#EDEEEF;}

#cc-panel .cc-help{color:#898C90;font-size:11px;line-height:1.4;margin-top:10px}
#cc-toggle{left:auto!important;right:12px;bottom:128px;}
#cc-panel{left:auto!important;right:12px;bottom:171px;}

/* V5: calm narrow dialogue columns (not full-bleed messages) */
[role="log"][aria-label="Chat messages"] [data-sentry-component="LeftTextContent"],
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"]{
  width:100%!important;max-width:610px!important;
  margin-left:auto!important;margin-right:auto!important;
  box-sizing:border-box!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="LeftTextContent"]{
  padding-right:14px!important;padding-left:14px!important;
  justify-content:flex-start!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"]{
  padding-right:14px!important;padding-left:14px!important;
  justify-content:flex-end!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="LeftTextContent"] > div,
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"] > div{
  flex:0 1 auto!important;min-width:0!important;width:fit-content!important;
  max-width:min(82%,450px)!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"] > div{
  max-width:min(76%,400px)!important;margin-left:auto!important;
}
/* Prevent flex grandchildren from stretching the bubble all the way across. */
[role="log"][aria-label="Chat messages"] [data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"],
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
  width:fit-content!important;max-width:100%!important;
  min-width:0!important;box-sizing:border-box!important;
  overflow-wrap:anywhere!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"]{
  padding:6px 4px 8px!important;background:transparent!important;border:0!important;
}
[role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
  padding:11px 13px!important;background:#F3F3F3!important;border:0!important;border-radius:12px!important;
}
/* Keep author name at the same size as the body, with subtle emphasis. */
.cc-meta-name{
  font-size:14px!important;font-weight:600!important;line-height:1.5!important;
  letter-spacing:-.01em!important;
}
.cc-meta{margin-bottom:5px!important;}
/* Visually gentle scrollbar without changing the scroll behavior */
[role="log"][aria-label="Chat messages"],
[data-sentry-component="ChatRoomReadyView"] [class*="overflow-y-auto"]{
  scrollbar-width:thin!important;
  scrollbar-color:rgba(140,145,150,.25) transparent!important;
}
[role="log"][aria-label="Chat messages"]::-webkit-scrollbar,
[data-sentry-component="ChatRoomReadyView"] [class*="overflow-y-auto"]::-webkit-scrollbar{width:4px!important;}
[role="log"][aria-label="Chat messages"]::-webkit-scrollbar-track,
[data-sentry-component="ChatRoomReadyView"] [class*="overflow-y-auto"]::-webkit-scrollbar-track{background:transparent!important;}
[role="log"][aria-label="Chat messages"]::-webkit-scrollbar-thumb,
[data-sentry-component="ChatRoomReadyView"] [class*="overflow-y-auto"]::-webkit-scrollbar-thumb{
 background:rgba(145,149,153,.26)!important;border-radius:8px!important;
}
/* Settings button stays in one place, regardless of whether jump-to-latest is shown */
#cc-toggle{position:fixed!important;left:auto!important;right:12px!important;bottom:153px!important;}
#cc-panel{position:fixed!important;left:auto!important;right:12px!important;bottom:197px!important;}
/* Sidebar Chat menu: light surface and correct text/icon contrast */
[role="dialog"][aria-label="Chat menu"]{
  background:#FFFFFF!important;background-image:none!important;
  color:#292C30!important;border-left:1px solid #E6E7E8!important;
  box-shadow:-7px 0 24px rgba(0,0,0,.08)!important;
}
[role="dialog"][aria-label="Chat menu"] > div,
[role="dialog"][aria-label="Chat menu"] .bg-gray-sub2{
  background:#FFFFFF!important;background-image:none!important;
}
[role="dialog"][aria-label="Chat menu"] [data-sentry-component="SidebarPieceBalance"]{
  background:#F5F5F5!important;border:1px solid #E8E9EA!important;
}
[role="dialog"][aria-label="Chat menu"] :is(.text-gray-200,.text-white,[class~="text-white/50"]),
[role="dialog"][aria-label="Chat menu"] button:not(.bg-primary-400):not(.bg-error-light) :is(span,div){
  color:#34383C!important;-webkit-text-fill-color:#34383C!important;
}
/* Literal slash classes require escaped CSS, and were present in the supplied markup. */
[role="dialog"][aria-label="Chat menu"] [class~="text-white/50"],
[role="dialog"][aria-label="Chat menu"] :is(svg[class~="text-white/50"],svg.text-white){
  color:#82878C!important;-webkit-text-fill-color:#82878C!important;
}
[role="dialog"][aria-label="Chat menu"] :is(svg.text-white,svg.text-gray-200){color:#52575B!important;}
[role="dialog"][aria-label="Chat menu"] [data-sentry-component="SnapshotArchiveSection"] button,
[role="dialog"][aria-label="Chat menu"] button{border-color:#E5E6E8!important;}
[role="dialog"][aria-label="Chat menu"] :is([class~="border-t-white/5"],[class~="border-l-white/[8%]"]){
 border-color:#E9EAEC!important;
}
[role="dialog"][aria-label="Chat menu"] [data-sentry-component="SidebarPieceBalance"] button,
[role="dialog"][aria-label="Chat menu"] button.bg-primary-400{
 background:#292C30!important;color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[role="dialog"][aria-label="Chat menu"] [data-sentry-component="SidebarPieceBalance"] button :is(span,svg),
[role="dialog"][aria-label="Chat menu"] button.bg-primary-400 :is(span,svg){
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[role="dialog"][aria-label="Chat menu"] [class~="bg-white/5"],
[role="dialog"][aria-label="Chat menu"] [class~="bg-white/10"]{background:#F6F6F6!important;}
[role="dialog"][aria-label="Chat menu"] button:hover{background-color:#F4F4F4!important;}
[role="dialog"][aria-label="Chat menu"] button.bg-primary-400:hover{background:#42464A!important;}


/* === V6: Profile editor / quick replies / profile chooser light surfaces === */
/* Profile edit view */
body:has([data-sentry-component="MyPlotChatProfileEdit"])
 [data-sentry-component="KeyboardStickyScrollContainer"],
[data-sentry-component="MyPlotChatProfileEdit"],
[data-sentry-component="MyPlotChatProfileEdit"] form{
 background:#FAFAFA!important;
 background-image:none!important;
 color:#25272A!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] :is(h3,.heading3,.body16,.title18),
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-source-file="ChatProfilePreview.tsx"] span{
 color:#292B2E!important;-webkit-text-fill-color:#292B2E!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-component="EditFormSectionContainer"] span[class~="text-white/50"]{
 color:#757A80!important;-webkit-text-fill-color:#757A80!important;
 opacity:1!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-component="InputField"] label[for],
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-element="Label"][data-sentry-component="Input"]{
 background:#FFFFFF!important;
 border:1px solid #DCDEE1!important;border-radius:12px!important;
 color:#25272A!important;-webkit-text-fill-color:#25272A!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] input[name="name"],
[data-sentry-component="MyPlotChatProfileEdit"] textarea[name="description"]{
 background:#FFFFFF!important;color:#25272A!important;
 -webkit-text-fill-color:#25272A!important;
 border:1px solid #DCDEE1!important;border-radius:12px!important;
 caret-color:#34383E!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] input[name="name"]{
 background:transparent!important;border:0!important;box-shadow:none!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] :is(input[name="name"],textarea[name="description"])::placeholder{
 color:#898D93!important;-webkit-text-fill-color:#898D93!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-source-file="TextareaField.tsx"] span[class*="text-primary-"]{
 color:#666C73!important;-webkit-text-fill-color:#666C73!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-source-file="ChatProfilePreview.tsx"] .bg-primary-400{
 background:#44484E!important;
}
[data-sentry-component="MyPlotChatProfileEdit"] [data-sentry-source-file="ChatProfilePreview.tsx"] .bg-primary-400 svg{
 color:#FFFFFF!important;
}

/* Suggestion panel, slide/cards and footer */
[data-testid="bottom-panel-slot"],
[data-sentry-component="QuickReplyPanel"],
[data-sentry-component="QuickReplyPanel"] [data-sentry-component="InlineTooltip"]{
 background:#FAFAFA!important;background-image:none!important;
 color:#292C30!important;
}
[data-sentry-component="QuickReplySetSlide"] > button,
[data-sentry-component="QuickReplySetSlide"] > div[aria-label="Loading suggestions"]{
 background:#FFFFFF!important;
 background-image:none!important;
 border:1px solid #E1E3E5!important;
 border-radius:14px!important;box-shadow:0 2px 7px rgba(0,0,0,.035)!important;
}
[data-sentry-component="QuickReplySetSlide"] > button > div,
[data-sentry-component="QuickReplySetSlide"] > button p,
[data-sentry-component="QuickReplySetSlide"] > button .body14{
 color:#292C30!important;-webkit-text-fill-color:#292C30!important;
}
[data-sentry-component="QuickReplySetSlide"] > button :is(em,i){
 color:#7D8288!important;-webkit-text-fill-color:#7D8288!important;
 opacity:1!important;
}
[data-sentry-component="QuickReplySetSlide"] [aria-label="Loading suggestions"] svg{
 color:#73777C!important;
}
[data-sentry-component="QuickReplyRegenControlBar"]{
 background:#FAFAFA!important;border-top:1px solid #E6E7E9!important;
}
[data-sentry-component="QuickReplyQuota"] :is(span,svg),
[data-sentry-component="QuickReplyQuota"] [class~="text-white/50"],
[data-sentry-component="QuickReplyQuota"] [data-sentry-component="renderWhite"]{
 color:#5A5F65!important;-webkit-text-fill-color:#5A5F65!important;opacity:1!important;
}
[data-sentry-component="QuickReplyRegenControlBar"] button[aria-label="See other suggestions"]{
 background:#FFFFFF!important;border:1px solid #DDE0E2!important;
}
[data-sentry-component="QuickReplyRegenControlBar"] button[aria-label="See other suggestions"] svg{
 color:#4D5157!important;
}

/* Profile selector bottom sheet: target the actual dialog and its containing sheet */
[data-sentry-component="KeyboardAvoidingView"]:has([role="dialog"][aria-label="대화 프로필"])
 > [data-sentry-element="AnimatedDiv"],
[data-sentry-component="KeyboardAvoidingView"] [role="dialog"][aria-label="대화 프로필"]{
 background:#FCFCFC!important;background-image:none!important;
 color:#272A2E!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ProfileHubHeader"] h3,
[role="dialog"][aria-label="대화 프로필"] h3[class~="text-white/50"]{
 color:#686D73!important;-webkit-text-fill-color:#686D73!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"],
[role="dialog"][aria-label="대화 프로필"] button:has(>div >svg[data-sentry-source-file="ProfileHubBottomSheet.tsx"]),
[role="dialog"][aria-label="대화 프로필"] >div >div >button[class~="bg-white/5"]{
 background:#F4F4F4!important;border-color:#E8E8E8!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] .body1,
[role="dialog"][aria-label="대화 프로필"] :is(.body14,.text-gray-200){
 color:#2B2E32!important;-webkit-text-fill-color:#2B2E32!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] .caption1,
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] [class~="text-white/50"]{
 color:#777C83!important;-webkit-text-fill-color:#777C83!important;opacity:1!important;
}
[role="dialog"][aria-label="대화 프로필"] button[aria-label^="edit-"] svg,
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ProfileHubBottomSheet.tsx"] svg{
 color:#62676D!important;
}
[role="dialog"][aria-label="대화 프로필"] [class~="bg-white/5"],
[role="dialog"][aria-label="대화 프로필"] [class~="bg-white/[8%]"]{
 background-color:#F3F3F3!important;
}
[role="dialog"][aria-label="대화 프로필"] [class~="bg-white/5"] > div[class~="h-px"]{
 background:#E1E2E3!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] button:active{
 background:#EBEDEF!important;
}
/* Keep white check mark visible over its dark circular indicator */
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] .bg-primary-400{
 background:#44484E!important;
}
[role="dialog"][aria-label="대화 프로필"] [data-sentry-component="ChatProfileListItem"] .bg-primary-400 svg{
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
/* Drag handle for profile selector */
[data-sentry-component="KeyboardAvoidingView"]:has([role="dialog"][aria-label="대화 프로필"])
 svg.text-gray-700{color:#A0A4A9!important;}



/* V7 - Room list & navigation light-mode finishing pass */
[data-sentry-component="RoomList"]{
 background:#FAFAF9!important;
 color:#27292D!important;
}
[data-sentry-component="RoomList"] [data-sentry-component="FlatList"]{
 background:#FAFAF9!important;
 scrollbar-width:thin!important;
 scrollbar-color:#CDD1D3 transparent!important;
}
[data-sentry-component="RoomList"] [data-sentry-component="FlatList"]::-webkit-scrollbar,
[data-sentry-component="RoomList"] [data-sentry-component="ScrappedPlotsPreview"] [data-sentry-component="WrappedDiv"]::-webkit-scrollbar{
 width:4px!important;
 height:4px!important;
}
[data-sentry-component="RoomList"] [data-sentry-component="FlatList"]::-webkit-scrollbar-track,
[data-sentry-component="RoomList"] [data-sentry-component="ScrappedPlotsPreview"] [data-sentry-component="WrappedDiv"]::-webkit-scrollbar-track{
 background:transparent!important;
}
[data-sentry-component="RoomList"] [data-sentry-component="FlatList"]::-webkit-scrollbar-thumb,
[data-sentry-component="RoomList"] [data-sentry-component="ScrappedPlotsPreview"] [data-sentry-component="WrappedDiv"]::-webkit-scrollbar-thumb{
 background:#CDD1D3!important;border-radius:20px!important;
}
[data-sentry-component="RoomList"] [data-sentry-component="ScrappedPlotsPreview"] [data-sentry-component="WrappedDiv"]{
 scrollbar-width:thin!important;scrollbar-color:#CDD1D3 transparent!important;
}
[data-sentry-component="ScrappedPlotsPreview"]{
 border-bottom:1px solid #E9EAEB!important;
}
[data-sentry-component="ScrappedPlotsPreview"] h3,
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] span.body1{
 color:#25282C!important;-webkit-text-fill-color:#25282C!important;
}
[data-sentry-component="ScrappedPlotsPreview"] a[href*="scrapped-plots"],
[data-sentry-component="ScrappedPlotsPreview"] a[href*="scrapped-plots"] svg,
[data-sentry-source-file="ScrappedPlotsPreviewItem.tsx"] span{
 color:#62676D!important;-webkit-text-fill-color:#62676D!important;
}
[data-sentry-component="RoomList"] [data-sentry-source-file="Select.tsx"],
[data-sentry-component="RoomList"] [data-sentry-source-file="Select.tsx"] svg{
 color:#5A6066!important;-webkit-text-fill-color:#5A6066!important;
}
/* Exact room-preview markup uses testid (not data-testid), and a direct span. */
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] span.line-clamp-1,
a[testid^="room-list-item-"] span.line-clamp-1.body2,
a[href^="/ko/rooms/"] span.line-clamp-1.text-white\/50{
 color:#747A80!important;
 -webkit-text-fill-color:#747A80!important;
 opacity:1!important;
}
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] svg.text-gray-600{
 color:#8B9197!important;
}
/* Bottom nav: white surface, readable inactive + dark active icon/label. */
[data-sentry-component="NavigationBar"]{
 background:#FFFFFF!important;background-image:none!important;
 border-top:1px solid #E6E8EA!important;
 box-shadow:0 -2px 10px rgba(20,24,28,.025)!important;
}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"]{
 color:#888E95!important;-webkit-text-fill-color:#888E95!important;
}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"] svg,
[data-sentry-component="NavigationBar"] [id^="navigation-item-"] span{
 color:#888E95!important;-webkit-text-fill-color:#888E95!important;
}
/* Active tab on room list, selected by its actual DOM title/id. */
body:has([data-sentry-component="RoomList"]) [data-sentry-component="NavigationBar"] #navigation-item-Rooms,
body:has([data-sentry-component="RoomList"]) [data-sentry-component="NavigationBar"] #navigation-item-Rooms svg,
body:has([data-sentry-component="RoomList"]) [data-sentry-component="NavigationBar"] #navigation-item-Rooms span{
 color:#292D31!important;-webkit-text-fill-color:#292D31!important;
}
/* Retain active indication for other tabs if their class becomes gray-200. */
[data-sentry-component="NavigationBar"] [id^="navigation-item-"][class*="text-gray-200"]:is(:hover,:focus-visible) svg,
[data-sentry-component="NavigationBar"] [id^="navigation-item-"]:hover svg{
 color:#4F545B!important;
}


/* V8: shared theme palette. Change only the --cc-* tokens at :root for future colors. */
html,body,#__next,main#contents{background:var(--cc-bg)!important;color:var(--cc-text)!important}
/* Scrollbar repair: content scrolling is on nested WrappedDiv/FlatList, not window. */
html,body,main#contents,main#contents *,
[data-sentry-component="Home"], [data-sentry-component="CreatorCenterPage"],
[data-sentry-component="RoomList"], [data-sentry-component="MyPlotChatProfileEdit"]{
 scrollbar-width:thin!important;
 scrollbar-color:var(--cc-scroll) transparent!important;
}
html::-webkit-scrollbar,body::-webkit-scrollbar,main#contents::-webkit-scrollbar,
main#contents *::-webkit-scrollbar{width:4px!important;height:4px!important;background:transparent!important}
html::-webkit-scrollbar-track,body::-webkit-scrollbar-track,main#contents::-webkit-scrollbar-track,
main#contents *::-webkit-scrollbar-track{background:transparent!important;border:0!important;box-shadow:none!important}
html::-webkit-scrollbar-thumb,body::-webkit-scrollbar-thumb,main#contents::-webkit-scrollbar-thumb,
main#contents *::-webkit-scrollbar-thumb{
 background:var(--cc-scroll)!important;border-radius:999px!important;
 border:0!important;box-shadow:none!important;
}
html::-webkit-scrollbar-corner,body::-webkit-scrollbar-corner,main#contents *::-webkit-scrollbar-corner{background:transparent!important}
/* Generic bottom navigation: active tab is detected by the class used by Zeta, not room-only. */
[data-sentry-component="NavigationBar"]{
 background:var(--cc-panel)!important;border-color:var(--cc-stroke)!important;
 border-top:1px solid var(--cc-stroke)!important;
 box-shadow:0 -2px 8px rgba(25,27,30,.035)!important;
}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"]:not([class*="text-gray-200"]),
[data-sentry-component="NavigationBar"] [id^="navigation-item-"]:not([class*="text-gray-200"]) :is(svg,span){
 color:#83878D!important;-webkit-text-fill-color:#83878D!important;
}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"][class*="text-gray-200"],
[data-sentry-component="NavigationBar"] [id^="navigation-item-"][class*="text-gray-200"] :is(svg,span){
 color:var(--cc-accent-strong)!important;-webkit-text-fill-color:var(--cc-accent-strong)!important;
}
/* Don't override the red notification dot. */
[data-sentry-component="NavigationBar"] [class*="bg-error-main"]{background-color:#D45E59!important}
/* Creator center: consistent quiet surface, title + chips + list */
[data-sentry-component="CreatorCenterPage"]{background:var(--cc-bg)!important;color:var(--cc-text)!important}
[data-sentry-component="CreatorCenterModeFilter"]{
 background:var(--cc-bg)!important;border-bottom:1px solid var(--cc-stroke)!important;
}
[data-sentry-component="CreatorCenterModeFilter"] > button{color:#81858B!important;-webkit-text-fill-color:#81858B!important}
[data-sentry-component="CreatorCenterModeFilter"] > button:not([class*="text-white/50"]){
 color:var(--cc-accent-strong)!important;-webkit-text-fill-color:var(--cc-accent-strong)!important;
}
[data-sentry-component="CreatorCenterMyPlotListTabBar"]{background:var(--cc-bg)!important}
[data-sentry-component="CreatorCenterMyPlotListTabBar"] button[data-sentry-element="Chip"]{
 color:#555A61!important;-webkit-text-fill-color:#555A61!important;
 background:var(--cc-accent-soft)!important;border:1px solid var(--cc-stroke)!important;
}
[data-sentry-component="CreatorCenterMyPlotListTabBar"] button[data-sentry-element="Chip"][class*="bg-primary-400"]{
 background:var(--cc-accent)!important;border-color:var(--cc-accent)!important;
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
[data-sentry-component="CreatorCenterMyPlotListTabBar"] [data-sentry-source-file="Select.tsx"]{
 color:#6F747B!important;-webkit-text-fill-color:#6F747B!important;
}
[data-sentry-component="CreatorCenterMyPlotListHeader"] span,
[data-sentry-component="CreatorCenterMyPlotListItem"] .caption1,
[data-sentry-component="CreatorCenterMyPlotListItem"] [class*="text-white/50"]{
 color:#747980!important;-webkit-text-fill-color:#747980!important;
}
[data-sentry-component="CreatorCenterMyPlotListItem"]{border-color:var(--cc-stroke)!important}
[data-sentry-component="CreatorCenterMyPlotListItem"] .body1,
[data-sentry-component="CreatorCenterMyPlotListEmpty"] .heading3{
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
}
[data-sentry-component="CreatorCenterMyPlotListItem"] button svg{
 color:#747980!important;-webkit-text-fill-color:#747980!important;
}
[data-sentry-component="CreatorCenterMyPlotListItem"] button:disabled svg{color:#B8BBC1!important}
[data-sentry-component="CreatorCenterMyPlotListEmpty"] button[class*="bg-primary-400"]{
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
 background:var(--cc-accent)!important;border:1px solid var(--cc-accent)!important;
}
/* Home surface: white light panels, preserve promo/banner imagery. */
[data-sentry-component="Home"],[data-sentry-component="HomeContents"],
[data-testid="home-feed"]{background:var(--cc-bg)!important;color:var(--cc-text)!important}
[data-sentry-component="HomeContents"] [class*="bg-gray-sub1"]:not(:has(img[alt="main banner image"])){
 background:var(--cc-panel)!important;
 border-color:var(--cc-stroke)!important;
}
[data-sentry-component="HomeContents"] :is(.body1,.body2,.body14,.caption1)[class*="text-white/50"]{
 color:#747980!important;-webkit-text-fill-color:#747980!important;
}
/* My page, pass/credits/account widgets, preserve images and brand logos. */
main#contents:has([data-sentry-source-file="MyPage.tsx"]) {
 background:var(--cc-bg)!important;color:var(--cc-text)!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) :is(
 [data-sentry-component="MyPass"],[data-sentry-component="MyPagePieceManagement"],
 section[class*="bg-gray-sub1"]){background:#FFFFFF!important;border-color:var(--cc-stroke)!important}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) .body2,
main#contents:has([data-sentry-source-file="MyPage.tsx"]) .text-gray-200:not(button):not(a),
main#contents:has([data-sentry-source-file="MyPage.tsx"]) .body14:not(button):not(a){
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) :is(.caption1,.caption12,.body12)[class*="text-white/50"],
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="MyPass"] .text-white\/50,
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="MyPagePieceManagement"] [class*="text-white/50"]{
 color:#747980!important;-webkit-text-fill-color:#747980!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="MyPagePieceManagement"] [class*="bg-white/"]{
 background-color:#E9EBEE!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) :is(a,button)[class*="bg-gray-800"]{
 background:var(--cc-accent-soft)!important;color:var(--cc-accent-strong)!important;
 -webkit-text-fill-color:var(--cc-accent-strong)!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) :is(a,button)[class*="bg-primary-400"]{
 background:var(--cc-accent)!important;color:#292B30!important;
 -webkit-text-fill-color:#292B30!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="Footer"]{
 border-color:var(--cc-stroke)!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="Footer"] :is(.text-footer,.body12){
 color:#81858B!important;-webkit-text-fill-color:#81858B!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="Footer"] [data-sentry-component="SnsLinks"] a{
 background:var(--cc-accent-soft)!important;
}
main#contents:has([data-sentry-source-file="MyPage.tsx"]) [data-sentry-component="Footer"] [data-sentry-component="SnsLinks"] svg{
 color:#646971!important;-webkit-text-fill-color:#646971!important;
}
/* Distinct scrollbar visibility in menus and overlays too. */
[data-sentry-component="KeyboardAvoidingView"] *,[role="dialog"] *,
[data-sentry-component="QuickReplyPanel"] *{
 scrollbar-width:thin!important;scrollbar-color:var(--cc-scroll) transparent!important;
}
[data-sentry-component="KeyboardAvoidingView"] *::-webkit-scrollbar,
[role="dialog"] *::-webkit-scrollbar,
[data-sentry-component="QuickReplyPanel"] *::-webkit-scrollbar{width:4px!important;height:4px!important}
[data-sentry-component="KeyboardAvoidingView"] *::-webkit-scrollbar-thumb,
[role="dialog"] *::-webkit-scrollbar-thumb,
[data-sentry-component="QuickReplyPanel"] *::-webkit-scrollbar-thumb{
 background:var(--cc-scroll)!important;border-radius:999px!important;
}


/* === V9: Neutral light-gray design system === */
:root{color-scheme:light}
/* Consistent neutral gray scroll bars, including horizontal lists and dialogs */
html,body,body *,#contents,#contents *,[role="dialog"],[role="dialog"] *,
[data-sentry-component="KeyboardAvoidingView"] *,[data-sentry-component="DropdownMenuItem"] *{
  scrollbar-width:thin!important;scrollbar-color:var(--cc-scroll) transparent!important;
}
html::-webkit-scrollbar,body::-webkit-scrollbar,body *::-webkit-scrollbar,
#contents *::-webkit-scrollbar,[role="dialog"] *::-webkit-scrollbar{
  width:4px!important;height:4px!important;background:transparent!important;
}
html::-webkit-scrollbar-track,body::-webkit-scrollbar-track,body *::-webkit-scrollbar-track,
#contents *::-webkit-scrollbar-track,[role="dialog"] *::-webkit-scrollbar-track{
  background:transparent!important;border:0!important;
}
html::-webkit-scrollbar-thumb,body::-webkit-scrollbar-thumb,body *::-webkit-scrollbar-thumb,
#contents *::-webkit-scrollbar-thumb,[role="dialog"] *::-webkit-scrollbar-thumb{
  background:var(--cc-scroll)!important;border:0!important;border-radius:999px!important;
  box-shadow:none!important;
}
/* Round thumbnails in list views, not discover's large poster covers */
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] img,
[data-sentry-component="RoomList"] [data-sentry-source-file="ScrappedPlotsPreviewItem.tsx"] img,
[data-sentry-component="CreatorCenterMyPlotListItem"] a img{
  border-radius:50%!important;object-fit:cover!important;aspect-ratio:1/1!important;
}
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] img{
  width:48px!important;height:48px!important;
}
[data-sentry-component="RoomList"] [data-sentry-source-file="ScrappedPlotsPreviewItem.tsx"] img{
  width:60px!important;height:60px!important;
}
[data-sentry-component="CreatorCenterMyPlotListItem"] a img{
  width:46px!important;height:46px!important;flex-shrink:0!important;
}
/* Room list preview text stays readable even with Zeta's explicit text-white/50 */
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] span.line-clamp-1,
[data-sentry-component="RoomList"] a[testid^="room-list-item-"] span[class*="text-white/50"]{
 color:#747980!important;-webkit-text-fill-color:#747980!important;opacity:1!important;
}
/* Creator tabs and counts */
[data-sentry-component="CreatorCenterModeFilter"] button:not([class*="text-white/50"]){
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
[data-sentry-component="CreatorCenterModeFilter"] button[class*="text-white/50"],
[data-sentry-component="CreatorCenterMyPlotListHeader"] span,
[data-sentry-component="CreatorCenterMyPlotListItem"] .caption1{
 color:#757A81!important;-webkit-text-fill-color:#757A81!important;
}
[data-sentry-component="CreatorCenterMyPlotListTabBar"] button[data-sentry-element="Chip"]{
 background:var(--cc-accent-soft)!important;border-color:var(--cc-stroke)!important;
 color:#5B6067!important;-webkit-text-fill-color:#5B6067!important;
}
[data-sentry-component="CreatorCenterMyPlotListTabBar"] button[data-sentry-element="Chip"][class*="bg-primary-400"]{
 background:#D7D9DE!important;border-color:#D7D9DE!important;
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
/* Dropdown menu: original component has dark-surface utility classes */
[data-sentry-source-file="DropdownMenu.tsx"] [class*="bg-gray-sub1"]{
 background:#FFFFFF!important;color:var(--cc-text)!important;
 border:1px solid var(--cc-stroke)!important;
 box-shadow:0 8px 30px rgba(29,31,34,.12)!important;
}
[data-sentry-component="DropdownMenuItem"]{
 background:#FFFFFF!important;border-color:var(--cc-stroke)!important;
}
[data-sentry-component="DropdownMenuItem"]:hover,
[data-sentry-component="DropdownMenuItem"]:focus-within{
 background:#F3F4F5!important;
}
[data-sentry-component="DropdownMenuItem"] button,
[data-sentry-component="DropdownMenuItem"] :is(.body2,.font-medium),
[data-sentry-component="DropdownMenuItem"] [class*="text-gray-200"]{
 color:#31343A!important;-webkit-text-fill-color:#31343A!important;
}
[data-sentry-component="DropdownMenuItem"] [class*="border-b-white"]{
 border-color:var(--cc-stroke)!important;
}
[data-sentry-component="DropdownMenuItem"] svg[class*="text-white/50"]{
 color:#747980!important;
}
/* Respect real ON / OFF from its existing toggle classes, only recolor backgrounds */
[data-sentry-component="DropdownMenuItem"] [data-sentry-component="ReadOnlyToggle"] [class*="bg-primary-300"]{
 background:#747980!important;
}
[data-sentry-component="DropdownMenuItem"] [data-sentry-component="ReadOnlyToggle"] [class*="bg-gray"]{
 background:#D8DADF!important;
}
/* Discover page layout + plot cards: preserve original full-size cover art */
[data-sentry-component="DiscoverPage"],[data-sentry-component="DiscoverLayout"]{
 background:var(--cc-bg)!important;color:var(--cc-text)!important;
}
[data-sentry-component="DiscoverSection"]>h2{
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
}
[data-sentry-component="FrameProfileCard"]{
 background:#FFFFFF!important;border:1px solid var(--cc-stroke)!important;
 box-shadow:0 1px 3px rgba(0,0,0,.025)!important;
}
/* The plot title sits over a cover gradient; preserve its light lettering there */
[data-sentry-component="FrameProfileCard"] [data-sentry-source-file="FrameProfileCard.tsx"] .body1.font-semibold{
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[data-sentry-component="FrameProfileCard"] .caption1:not([data-sentry-component="CountTag"] *),
[data-sentry-component="FrameProfileCard"] [data-sentry-component="Hashtags"] a{
 color:#666B73!important;-webkit-text-fill-color:#666B73!important;
}
[data-sentry-component="FrameProfileCard"] [data-sentry-component="Hashtags"] div[class*="to-gray-sub1"]{
 background:linear-gradient(to right,transparent,#FFFFFF)!important;
}
/* Text which is just below image and not a label overlay */
[data-sentry-component="FrameProfileCard"] > div > a > span.line-clamp-2{
 color:#5D626A!important;-webkit-text-fill-color:#5D626A!important;
}
/* Neutral bottom navigation, light active tab */
[data-sentry-component="NavigationBar"]{background:#FFFFFF!important;border-top:1px solid var(--cc-stroke)!important;}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"]:not([class*="text-gray-200"]) :is(svg,span){
 color:#858991!important;-webkit-text-fill-color:#858991!important;
}
[data-sentry-component="NavigationBar"] [id^="navigation-item-"][class*="text-gray-200"] :is(svg,span){
 color:#3E434A!important;-webkit-text-fill-color:#3E434A!important;
}


/* V10: discover feed filters — active neutral chip, readable inactive tabs */
[data-sentry-component="DiscoverPage"] [data-sentry-component="WrappedDiv"]:has(>div>button[class*="rounded-full"]) >div>button,
[data-sentry-component="DiscoverPage"] [data-sentry-component="WrappedDiv"]:has(>div>button[class*="rounded-full"]) >div>button[class*="text-white/50"]{
 color:#6D727A!important;-webkit-text-fill-color:#6D727A!important;
 background:transparent!important;
}
[data-sentry-component="DiscoverPage"] [data-sentry-component="WrappedDiv"]:has(>div>button[class*="rounded-full"]) >div>button[class*="bg-primary-400"]{
 background:#E9EAED!important;color:#30343A!important;-webkit-text-fill-color:#30343A!important;
 border:1px solid #DCDDDF!important;
}
/* Discover: image is a full intact poster, title/description remain BELOW it. */
[data-sentry-component="FrameProfileCard"]{
 background:#FFFFFF!important;color:#292B30!important;
 border:1px solid var(--cc-stroke)!important;
 border-radius:12px!important;overflow:hidden!important;
}
[data-sentry-component="FrameProfileCard"] > a:first-child{
 display:block!important;position:relative!important;flex:none!important;
 width:100%!important;aspect-ratio:3/4!important;overflow:hidden!important;
 border-radius:11px 11px 0 0!important;
}
[data-sentry-component="FrameProfileCard"] > a:first-child > img{
 width:100%!important;height:100%!important;object-fit:cover!important;
 border-radius:11px 11px 0 0!important;
}
/* This dark overlay was designed for titles superimposed ON the poster. Remove it. */
[data-sentry-component="FrameProfileCard"] > a:first-child > div[class*="bg-linear-to-b"]{
 display:none!important;
}
/* Zeta uses -mt-10 to overlap the title and image; reset it on light cards. */
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"][data-sentry-source-file="FrameProfileCard.tsx"]{
 margin-top:0!important;position:relative!important;z-index:1!important;
 padding-top:10px!important;min-width:0!important;
}
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"] > a:first-child{
 margin:0!important;position:relative!important;min-width:0!important;
}
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"] > a:first-child > span.body1,
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"] > a:first-child > span.font-semibold{
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
 text-shadow:none!important;
}
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"] > a:first-child > span.caption1{
 color:#676D76!important;-webkit-text-fill-color:#676D76!important;
 text-shadow:none!important;
}
[data-sentry-component="FrameProfileCard"] [data-sentry-component="Hashtags"] a,
[data-sentry-component="FrameProfileCard"] > div[data-sentry-element="Box"] > div > a[class*="text-primary-"]{
 color:#747980!important;-webkit-text-fill-color:#747980!important;
}
[data-sentry-component="FrameProfileCard"] [data-sentry-component="Hashtags"] div[class*="to-gray-sub1"]{
 background:linear-gradient(to right,transparent,#FFFFFF)!important;
}
/* Views counters sit ON image: keep a dark background with white text. */
[data-sentry-component="FrameProfileCard"] [data-sentry-component="CountTag"] > div[class*="bg-gray-800"]{
 background:rgba(43,46,51,.79)!important;
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[data-sentry-component="FrameProfileCard"] [data-sentry-component="CountTag"] > div[class*="bg-gray-800"] svg{
 color:#FFFFFF!important;
}
/* Ensure settings cog does not float over cards on non-chat pages. */
body:not(:has([data-sentry-component="ChatRoomReadyView"])) #cc-toggle,
body:not(:has([data-sentry-component="ChatRoomReadyView"])) #cc-panel{display:none!important;}


/* V11: Exact container for home feed tabs */
[data-sentry-component="FeedTabNavigator"]{
 background:var(--cc-bg)!important;background-image:none!important;
 border-bottom:1px solid #E8E9EB!important;
}
[data-sentry-component="FeedTabNavigator"] button{
 color:#666A72!important;-webkit-text-fill-color:#666A72!important;
 background:transparent!important;
}
[data-sentry-component="FeedTabNavigator"] button[class*="bg-primary-400"]{
 background:#E9EAED!important;color:#292B30!important;
 -webkit-text-fill-color:#292B30!important;
 border:1px solid #DCDDDF!important;
}
/* Scrapped row: override 60x80 intrinsic Tailwind dimensions; keep text underneath */
[data-sentry-component="ScrappedPlotsPreview"] a[href*="/plots/"]{
 width:60px!important;min-width:60px!important;
}
[data-sentry-component="ScrappedPlotsPreview"] a[href*="/plots/"] img{
 width:60px!important;height:60px!important;min-height:60px!important;
 aspect-ratio:1/1!important;border-radius:50%!important;
 object-fit:cover!important;display:block!important;
}
[data-sentry-component="ScrappedPlotsPreview"] a[href*="/plots/"] span{
 color:#61666E!important;-webkit-text-fill-color:#61666E!important;
}
[data-sentry-component="ScrappedPlotsPreview"]{
 border-bottom:1px solid #E7E8EA!important;background:var(--cc-panel-alt)!important;
}
/* Plot profile: neutral backgrounds, distinct image overlays and readable labels */
[data-sentry-component="PlotProfile"]{
 background:var(--cc-panel-alt)!important;color:#292B30!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotBasic"],
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotDetail"],
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotIntro"],
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLorebook"]{
 color:#292B30!important;
}
[data-sentry-component="PlotProfile"] :is(.heading1,.heading2,.title1,.title16),
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotBasic"] > span.title1,
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotCharacter"] > div.heading2{
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotDetail"] p,
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotCharacter"] p,
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotDate"],
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotCreatorTopRow"] span[class*="text-white/50"],
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLorebookItem"] .caption1{
 color:#656A72!important;-webkit-text-fill-color:#656A72!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotCharacter"],
[data-sentry-component="PlotProfile"] [data-sentry-source-file="PlotLorebook.tsx"] a[href*="/lorebooks/"]{
 background:#FFFFFF!important;border:1px solid #E5E6E9!important;
 border-radius:12px!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLorebookItem"] p,
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotCreatorTopRow"] span[class*="text-gray-200"]{
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLorebookItem"] svg,
[data-sentry-component="PlotProfile"] [data-sentry-source-file="PlotLorebook.tsx"] button svg{
 color:#737980!important;
}
/* The source has a dark cover dimmer and gradients, keep a gentle white blending */
[data-sentry-component="PlotCoverMulti"] .bg-gray-main\/70{
 background:rgba(247,247,248,.67)!important;
}
[data-sentry-component="PlotCoverMulti"] [class*="from-gray-main/50"]{
 background:linear-gradient(to bottom,rgba(247,247,248,.6),transparent)!important;
}
[data-sentry-component="PlotCoverMulti"] [class*="via-gray-main/80"]{
 background:linear-gradient(to bottom,transparent,rgba(247,247,248,.8) 70%,var(--cc-panel-alt))!important;
}
/* Like pill and small tags are deliberately dark on top of a photograph */
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLikePill"],
[data-sentry-component="PlotProfile"] [data-sentry-component="CountTag"] [class*="bg-gray-800"]{
 background:rgba(39,42,46,.78)!important;color:#FFFFFF!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="PlotLikePill"] :is(span,svg),
[data-sentry-component="PlotProfile"] [data-sentry-component="CountTag"] [class*="bg-gray-800"] svg{
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
/* Intro: clear character name, dialogue and soft em styling */
[data-sentry-component="PlotIntro"] [data-sentry-component="ChatBubbleContainer"]{
 background:#FFFFFF!important;border:1px solid #E5E6E9!important;
 color:#292B30!important;
}
[data-sentry-component="PlotIntro"] [data-sentry-component="ChatBubbleContainer"] .chat,
[data-sentry-component="PlotIntro"] [data-sentry-component="ChatBubbleContainer"] p{
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
[data-sentry-component="PlotIntro"] [data-sentry-component="ChatBubbleContainer"] :is(i,em){
 color:#858990!important;-webkit-text-fill-color:#858990!important;
}
[data-sentry-component="PlotIntro"] [data-sentry-component="StaticIntroMessage"] span.caption1{
 color:#51565E!important;-webkit-text-fill-color:#51565E!important;
}
/* Header has a dark inline backdrop; overwrite precisely that overlay */
[data-sentry-source-file="PlotProfileHeader.tsx"] header[data-sentry-component="Header"]{
 background:var(--cc-panel-alt)!important;border-bottom:1px solid #E8E9EB!important;
}
[data-sentry-source-file="PlotProfileHeader.tsx"] header[data-sentry-component="Header"] > div.absolute{
 background:var(--cc-panel-alt)!important;background-color:var(--cc-panel-alt)!important;
}
[data-sentry-source-file="PlotProfileHeader.tsx"] header[data-sentry-component="Header"] :is(h3,span,svg){
 color:#292B30!important;-webkit-text-fill-color:#292B30!important;
}
/* Plot profile bottom bar */
[data-sentry-component="PlotProfile"] [data-sentry-component="BottomActionArea"]{
 background:#FFFFFF!important;border-top:1px solid #E6E7EA!important;
}
[data-sentry-component="PlotProfile"] [data-sentry-component="BottomActionArea"] button:not([data-testid="plot-profile-start-chat"]),
[data-sentry-component="PlotProfile"] [data-sentry-component="BottomActionArea"] button:not([data-testid="plot-profile-start-chat"]) :is(svg,span){
 color:#5B6169!important;-webkit-text-fill-color:#5B6169!important;
}
[data-sentry-component="PlotProfile"] [data-testid="plot-profile-start-chat"]{
 background:#474C54!important;color:#FFFFFF!important;
 -webkit-text-fill-color:#FFFFFF!important;
}
/* Intro and general scrolling remain neutral, even in nested profile views */
[data-sentry-component="PlotProfile"] *,
[data-sentry-component="FeedTabNavigator"] *,
[data-sentry-component="ScrappedPlotsPreview"] *{
 scrollbar-width:thin!important;scrollbar-color:#CED0D4 transparent!important;
}


/* V12 — narration is a soft white card with a delicate dashed gray outline */
[data-sentry-component="NarratorBubble"] .message-context-menu-trigger,
.message-context-menu-trigger:has(svg[data-sentry-source-file="NarratorBubble.tsx"]){
  background:#FFFFFF!important;
  background-image:none!important;
  border:1.5px dashed #CDD0D4!important;
  border-radius:13px!important;
  box-shadow:none!important;
  box-sizing:border-box!important;
}
[data-sentry-component="NarratorBubble"] .chat,
[data-sentry-component="NarratorBubble"] .chat *,
.message-context-menu-trigger:has(svg[data-sentry-source-file="NarratorBubble.tsx"]) .chat,
.message-context-menu-trigger:has(svg[data-sentry-source-file="NarratorBubble.tsx"]) .chat *{
  color:#858A90!important;
  -webkit-text-fill-color:#858A90!important;
}
/* Hide only NarratorBubble's original text-lines icon, leaving all other SVGs intact. */
svg[data-sentry-source-file="NarratorBubble.tsx"][data-sentry-element="TextIcon"],
.message-context-menu-trigger svg[data-sentry-source-file="NarratorBubble.tsx"]{
  display:none!important;
}
/* Text-only narration. No injected emoji or replacement icon. */
[data-sentry-component="NarratorBubble"] .message-context-menu-trigger{
 gap:0!important;
 padding:12px 14px!important;
}
[data-sentry-component="NarratorBubble"] .message-context-menu-trigger::before,
[data-sentry-component="NarratorBubble"] .message-context-menu-trigger::after{
 content:none!important;
 display:none!important;
}
/* Keep the floating settings control exactly centered above native scroll-down. */
#cc-toggle{
 width:40px!important;height:40px!important;
 border-radius:50%!important;
 padding:0!important;
}

/* V14: equal-sized buttons, fixed location irrespective of scroll state */
#cc-toggle{
 width:32px!important;
 height:32px!important;
 min-width:32px!important;
 min-height:32px!important;
 right:8px!important;
 bottom:120px!important;
 left:auto!important;
 font-size:17px!important;
}
#cc-panel{right:8px!important;bottom:164px!important;left:auto!important;}


/* V15 — quoted user messages styled as handwritten letters */
@font-face{
 font-family:'OngleipParkDahyeon';
 src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2');
 font-weight:400;
 font-style:normal;
 font-display:swap;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) [data-sentry-component="ChatBubbleContainer"] blockquote.cc-letter{
 box-sizing:border-box!important;
 display:flex!important;
 flex-direction:column!important;
 align-items:stretch!important;
 gap:7px!important;
 margin:7px 0!important;
 padding:12px 14px!important;
 border:1px solid #E2E3E7!important;
 border-radius:15px!important;
 background:#FFFFFF!important;
 background-image:none!important;
 box-shadow:0 1px 2px rgba(30,34,38,.035)!important;
 min-width:0!important;
 max-width:100%!important;
 font-family:'OngleipParkDahyeon',sans-serif!important;
 font-weight:400!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter > div.w-1,
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter > div[class*="bg-white/20"]{display:none!important;}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter > .shrink{
 flex:1 1 auto!important;
 min-width:0!important;
 width:100%!important;
 font-family:'OngleipParkDahyeon',sans-serif!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter .cc-letter-meta{
 display:flex!important;align-items:baseline!important;
 flex-wrap:wrap!important;gap:3px!important;
 font:400 14px/1.35 'OngleipParkDahyeon',sans-serif!important;
 color:#5C6066!important;-webkit-text-fill-color:#5C6066!important;
 border-bottom:1px solid var(--cc-user)!important;
 padding-bottom:7px!important;
 letter-spacing:0!important;
 user-select:none!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter .cc-letter-meta .cc-letter-stamp{
 margin-right:3px!important;font-size:15px!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter .cc-letter-meta .cc-letter-time{
 color:#92969D!important;-webkit-text-fill-color:#92969D!important;
 margin-left:3px!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter :is(p,span,em,i),
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter > .shrink{
 font-family:'OngleipParkDahyeon',sans-serif!important;
 font-size:17px!important;
 font-weight:400!important;
 line-height:1.55!important;
 color:#4D5055!important;
 -webkit-text-fill-color:#4D5055!important;
 letter-spacing:0!important;
 overflow-wrap:anywhere!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter p{margin:0!important;}

/* Header typography stays separate from handwritten message text. */
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter .cc-letter-meta span{
 font-family:'OngleipParkDahyeon',sans-serif!important;
 font-size:14px!important;
 line-height:1.35!important;
 color:#5C6066!important;
 -webkit-text-fill-color:#5C6066!important;
}
:is([data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]) blockquote.cc-letter .cc-letter-meta .cc-letter-time{
 color:#92969D!important;-webkit-text-fill-color:#92969D!important;
}


/* V18 · Native message-action sheet (report, snapshot, bookmark, reset, copy, capture, delete) */
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"]:has(button[data-sentry-element="LogRawButton"]){
 background:#FFFFFF!important;background-image:none!important;
 border:1px solid var(--cc-stroke)!important;border-bottom:0!important;
 box-shadow:0 -8px 28px rgba(35,38,45,.08)!important;
 color:var(--cc-text)!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"]:has(button[data-sentry-element="LogRawButton"]) > div:first-child svg{
 color:#C7CBD1!important;-webkit-text-fill-color:#C7CBD1!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"]{
 background:#F6F6F8!important;background-image:none!important;
 border-color:#E8E9EC!important;color:var(--cc-text)!important;
 box-shadow:none!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"]:not(:disabled):active{
 background:#E8E9EC!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"] :is(span,svg){
 color:#3F434A!important;-webkit-text-fill-color:#3F434A!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"]:disabled{
 background:#F6F6F8!important;opacity:.4!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"]:has(.text-error-light){
 background:#FFF4F4!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] button[data-sentry-element="LogRawButton"]:has(.text-error-light) :is(svg,span){
 color:#C35257!important;-webkit-text-fill-color:#C35257!important;
}
[data-sentry-element="AnimatedDiv"].mt-auto[class*="rounded-t-"] [class*="border-b-white"]{
 border-bottom-color:var(--cc-stroke)!important;
}
/* Capture and deletion selection UI */
[data-sentry-component="CaptureModeBottom"],
[data-sentry-component="DeleteModeBottom"],
[data-sentry-component="DeleteStartNotice"]{
 background:var(--cc-bg)!important;background-image:none!important;
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
}
[data-sentry-component="CaptureModeBottom"],
[data-sentry-component="DeleteModeBottom"]{border-top:1px solid var(--cc-stroke)!important;}
[data-sentry-component="CaptureModeBottom"] button{
 background:var(--cc-accent-strong)!important;color:#FFFFFF!important;
 -webkit-text-fill-color:#FFFFFF!important;border:0!important;
}
[data-sentry-component="DeleteModeBottom"] button{
 background:#C35257!important;color:#FFFFFF!important;
 -webkit-text-fill-color:#FFFFFF!important;border:0!important;
}
:is([data-sentry-component="CaptureModeBottom"],[data-sentry-component="DeleteModeBottom"]) button:disabled{
 background:#E0E2E5!important;color:#989DA4!important;
 -webkit-text-fill-color:#989DA4!important;
}

/* V19 — restrained relative dates beside message author names */
.cc-meta-date{
 font:400 11px/1.5 inherit!important;
 font-size:11px!important;
 font-weight:400!important;
 color:#9A9DA3!important;
 -webkit-text-fill-color:#9A9DA3!important;
 letter-spacing:0!important;
 white-space:nowrap!important;
}

/* V20 — quieter typography and measured spacing, retaining existing colors */
[data-sentry-component="ChatRoomReadyView"] :is([data-sentry-component="LeftTextContent"],[data-sentry-component="RightTextContent"]){
 padding-top:6px!important;padding-bottom:6px!important;
}
[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 max-width:min(410px,100%)!important;
 padding:7px 10px 8px!important;
}
[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 max-width:min(380px,100%)!important;
 padding:11px 13px!important;
}
[data-sentry-component="ChatRoomReadyView"] .cc-meta{
 gap:5px!important;margin-bottom:6px!important;line-height:1.4!important;
}
[data-sentry-component="ChatRoomReadyView"] .cc-meta-name{
 font-size:13px!important;font-weight:600!important;letter-spacing:-.018em!important;
 color:#303238!important;-webkit-text-fill-color:#303238!important;
}
[data-sentry-component="ChatRoomReadyView"] .cc-meta-date{
 font-size:11px!important;font-weight:400!important;line-height:1.4!important;
 letter-spacing:-.01em!important;color:#A0A3A9!important;
 -webkit-text-fill-color:#A0A3A9!important;
}
[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="ChatBubbleContainer"] .chat :is(em,i){
 color:#858A91!important;-webkit-text-fill-color:#858A91!important;
}
[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="ChatBubbleContainer"] .chat p+p{
 margin-top:7px!important;
}


/* V21: light edit-message composer; only the dedicated edit surface */
[data-sentry-component="EditModeInputPanelContent"]{background:#FFFFFF!important;color:var(--cc-text)!important}
[data-sentry-component="EditModeInputPanelContent"] section>div:first-child{
 background:#FFFFFF!important;border-color:#E0E2E5!important;box-shadow:none!important;
}
[data-sentry-component="EditModeInputPanelContent"] [aria-label="Resize edit area"]>div{
 background:#C9CCD1!important;
}
[data-sentry-component="EditModeInputPanelContent"] textarea[name="message"]{
 background:#FFFFFF!important;background-image:none!important;
 color:#303238!important;-webkit-text-fill-color:#303238!important;
 caret-color:#555B63!important;
 font-size:14px!important;line-height:1.65!important;
}
[data-sentry-component="EditModeInputPanelContent"] textarea[name="message"]::placeholder{
 color:#A2A6AC!important;-webkit-text-fill-color:#A2A6AC!important;
}
[data-sentry-component="EditModeInputPanelContent"] section>div:nth-child(2){
 background:#FFFFFF!important;border-color:#E0E2E5!important;
 border-top:1px solid #EBECEE!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Cancel editing"],
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Insert asterisk"]{
 background:#F0F1F3!important;color:#5B6068!important;
 border:1px solid #E4E6E9!important;box-shadow:none!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Save edit"]:not(:disabled){
 background:#444950!important;color:#FFFFFF!important;
 border:1px solid #444950!important;box-shadow:none!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Save edit"]:disabled{
 background:#ECEEF0!important;color:#A1A4AB!important;
 border:1px solid var(--cc-stroke)!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Cancel editing"] svg,
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Insert asterisk"] svg{
 color:#5B6068!important;-webkit-text-fill-color:#5B6068!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Save edit"]:not(:disabled) svg{
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[data-sentry-component="EditModeInputPanelContent"] button[aria-label="Save edit"]:disabled svg{
 color:#A1A4AB!important;-webkit-text-fill-color:#A1A4AB!important;
}
[data-sentry-component="EditModeInputPanelContent"] button:not(:disabled):active{opacity:.78!important}

/* V21: Piece purchasing sheet only, preserving original content and actions */
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="PieceChargeBalance"]) > [data-sentry-element="AnimatedDiv"][class*="rounded-t-"]{
 background:#FFFFFF!important;background-image:none!important;
 color:var(--cc-text)!important;box-shadow:0 -8px 28px rgba(35,38,45,.09)!important;
}
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="PieceChargeBalance"]) > [data-sentry-element="AnimatedDiv"][class*="rounded-t-"] >div:first-child svg{
 color:var(--cc-scroll)!important;
}
[data-sentry-component="PieceChargeBalance"]{
 background:#FFFFFF!important;border-bottom-color:#E7E8EB!important;
 color:#303238!important;
}
[data-sentry-component="PieceChargeBalance"] [class*="text-primary"]{
 color:#4B5057!important;-webkit-text-fill-color:#4B5057!important;
}
[data-sentry-component="PieceChargeItemList"]{
 background:#FFFFFF!important;color:#303238!important;
}
[data-sentry-component="PieceChargeItem"]{
 border-color:#EBECEF!important;background:#FFFFFF!important;
 color:#34373B!important;
}
[data-sentry-component="PieceChargeItem"] button[aria-label]{
 background:#484D54!important;border:1px solid #484D54!important;
 color:#FFFFFF!important;box-shadow:none!important;
}
[data-sentry-component="PieceChargeItem"] button[aria-label] :is(span,div){
 color:#FFFFFF!important;-webkit-text-fill-color:#FFFFFF!important;
}
[data-sentry-component="PieceChargeItem"] button[aria-label]:disabled{
 background:#E5E7EA!important;border-color:#E5E7EA!important;
}
[data-sentry-component="PieceChargeTerms"]{
 background:#FFFFFF!important;border-top-color:#E8EAED!important;
 color:#737780!important;
}
[data-sentry-component="PieceChargeTerms"] :is(span,div,li){
 color:#737780!important;-webkit-text-fill-color:#737780!important;
}
/* Native image banner remains intact; only its card outline changes */
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="PieceChargeBalance"])
 [data-sentry-source-file="PieceChargeBannerItem.tsx"]{color:inherit}

/* V22: edit shortcut floats above settings, both independently anchored */
#cc-edit-shortcut{
 position:fixed!important;
 z-index:2147483000!important;
 right:8px!important;bottom:164px!important;left:auto!important;
 display:flex!important;align-items:center!important;justify-content:center!important;
 width:32px!important;height:32px!important;min-width:32px!important;min-height:32px!important;
 border:1px solid #DDDFE0!important;border-radius:50%!important;
 background:#FFFFFF!important;color:#45484C!important;
 box-shadow:0 2px 8px #00000015!important;
 font:17px/1 sans-serif!important;cursor:pointer!important;
 padding:0!important;
}
#cc-edit-shortcut:hover:not(:disabled){background:#F1F2F4!important;}
#cc-edit-shortcut:disabled{opacity:.46!important;cursor:default!important;}
body:not(:has([data-sentry-component="ChatRoomReadyView"])) #cc-edit-shortcut{display:none!important;}
#cc-panel{bottom:208px!important;}


/* V24 - avatar appearance choices. No changes to native profile data or image sources. */
html.cc-avatar-user-hidden [data-sentry-component="RightTextContent"] > button.shrink-0,
html.cc-avatar-hidden [data-sentry-component="RightTextContent"] > button.shrink-0 {display:none!important;}
html.cc-avatar-hidden [data-sentry-component="LeftTextContent"] > button.shrink-0 {display:none!important;}
html.cc-avatar-heart [data-sentry-component="LeftTextContent"] > button.shrink-0{
 position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;
 flex-shrink:0!important;min-width:32px!important;width:32px!important;height:32px!important;
 overflow:hidden!important;border:1px solid var(--cc-stroke)!important;border-radius:50%!important;
 background:#FFFFFF!important;background-image:none!important;box-shadow:none!important;
 color:var(--cc-accent-strong)!important;
}
html.cc-avatar-heart [data-sentry-component="LeftTextContent"] > button.shrink-0 > * {visibility:hidden!important;opacity:0!important;}
html.cc-avatar-heart [data-sentry-component="LeftTextContent"] > button.shrink-0::after{
 content:''!important;position:absolute!important;inset:0!important;
 display:block!important;visibility:visible!important;opacity:1!important;
 width:19px!important;height:19px!important;margin:auto!important;
 background:var(--cc-accent-strong)!important;pointer-events:none!important;
 -webkit-mask-image:url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M19.0711%2013.1421L13.4142%2018.799C12.6332%2019.58%2011.3668%2019.58%2010.5858%2018.799L4.92894%2013.1421C2.97632%2011.1895%202.97632%208.02369%204.92894%206.07106C6.88157%204.11844%2010.0474%204.11844%2012%206.07106C13.9526%204.11844%2017.1185%204.11844%2019.0711%206.07106C21.0237%208.02369%2021.0237%2011.1895%2019.0711%2013.1421Z%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")!important;
 mask-image:url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M19.0711%2013.1421L13.4142%2018.799C12.6332%2019.58%2011.3668%2019.58%2010.5858%2018.799L4.92894%2013.1421C2.97632%2011.1895%202.97632%208.02369%204.92894%206.07106C6.88157%204.11844%2010.0474%204.11844%2012%206.07106C13.9526%204.11844%2017.1185%204.11844%2019.0711%206.07106C21.0237%208.02369%2021.0237%2011.1895%2019.0711%2013.1421Z%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")!important;
 -webkit-mask-position:center!important;mask-position:center!important;
 -webkit-mask-repeat:no-repeat!important;mask-repeat:no-repeat!important;
 -webkit-mask-size:19px 19px!important;mask-size:19px 19px!important;
}
/* Keep avatar visually aligned with the top of the message body. */
[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="LeftTextContent"] > button.shrink-0{
 transform:translateY(5px)!important;
}
html.cc-avatar-user-hidden [data-sentry-component="RightTextContent"] > div{margin-left:auto!important;}
#cc-panel .cc-avatar-options{display:flex!important;flex-direction:column!important;gap:3px!important;margin:4px 0 10px!important;}
#cc-panel .cc-avatar-option{display:flex!important;align-items:center!important;gap:9px!important;
 padding:7px 8px!important;border-radius:9px!important;color:#3D4147!important;
 background:transparent!important;font:12px/1.4 sans-serif!important;cursor:pointer!important;}
#cc-panel .cc-avatar-option:has(input:checked){background:#F2F3F5!important;}
#cc-panel .cc-avatar-option input{accent-color:#626971!important;width:14px!important;height:14px!important;margin:0!important;flex-shrink:0!important;}


/* V29 compact settings: less chrome, same native controls */
#cc-panel{
 width:226px!important;
 padding:9px 10px 10px!important;
 border-radius:12px!important;
 max-height:min(70vh,420px)!important;
 box-shadow:0 7px 22px #00000012!important;
}
#cc-panel .cc-section-title{
 margin:6px 0 3px!important;
 font-size:10px!important;
 line-height:1.3!important;
 letter-spacing:0!important;
}
#cc-panel .cc-section-title:first-child{margin-top:1px!important;}
#cc-panel .cc-avatar-options{gap:1px!important;margin:0 0 4px!important;}
#cc-panel .cc-avatar-option{
 padding:5px 7px!important;
 min-height:26px!important;
 gap:7px!important;
 border-radius:7px!important;
 font-size:11px!important;
}
#cc-panel .cc-avatar-option input{width:13px!important;height:13px!important;}
#cc-panel .cc-action-list{gap:5px!important;}
#cc-panel .cc-action{
 min-height:30px!important;
 padding:5px 6px!important;
 border-radius:7px!important;
 font-size:11px!important;
}

/* One consistent inline text highlight on desktop and mobile.
   Dialogue-only spans sit with the text, so there is no overlay or scrolling lag. */
html.cc-dialogue-highlight [data-sentry-component="ChatBubbleContainer"] .chat span.cc-dialogue-inline{
 background-image:linear-gradient(to bottom,transparent 62%,rgba(${accentRgb},.42) 62%,rgba(${accentRgb},.42) 90%,transparent 90%)!important;
 background-repeat:repeat!important;
 -webkit-box-decoration-break:clone;box-decoration-break:clone;
 text-decoration:none!important;
}
html:not(.cc-dialogue-highlight) [data-sentry-component="ChatBubbleContainer"] .chat span.cc-dialogue-inline{
 background-image:none!important;background-color:transparent!important;
 text-decoration:none!important;
}
/* V32: pastel user bubble wins over inherited gray overrides */
html [role="log"][aria-label="Chat messages"] [data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"],
html [data-sentry-component="ChatRoomReadyView"] [data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"]{
 background:var(--cc-user)!important;background-image:none!important;
 border-color:var(--cc-stroke)!important;
}
/* V34: hide native small Zeta watermark next to character bubbles only. */
[data-sentry-component="ChatRoomReadyView"] :is([data-sentry-component="ZetaWatermarkRaw"],[data-sentry-component="ZetaWatermarkEditedRaw"]){display:none!important;}
/* V32: third floating tool sits 44px above edit */
#cc-line-shortcut{position:fixed!important;right:8px!important;bottom:208px!important;z-index:2147483000!important;
 width:32px!important;height:32px!important;min-height:32px!important;min-width:32px!important;
 padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;
 border:1px solid var(--cc-stroke)!important;border-radius:50%!important;
 background:white!important;color:var(--cc-accent-strong)!important;
 box-shadow:0 2px 8px #00000012!important;cursor:pointer!important;}
#cc-line-shortcut svg{width:17px;height:17px;stroke:currentColor!important;fill:none!important}
#cc-line-shortcut[aria-pressed="true"]{background:var(--cc-user)!important;border-color:var(--cc-accent)!important;}


/* V36 — profile-selection light palette, scoped only to this step. */
[data-sentry-component="PlayerCharacterSelect"]{background:var(--cc-bg)!important;color:var(--cc-text)!important;}
[data-sentry-component="PlayerCharacterSelect"]>h4{color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"]{background:#fff!important;border:1px solid var(--cc-stroke)!important;box-shadow:0 6px 22px rgba(40,45,50,.06)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"]>div[class*="bg-black/30"]{background:linear-gradient(180deg,rgba(255,255,255,0) 38%,rgba(255,255,255,.90) 77%,#fff 100%)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] h4,
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] span{color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] button[aria-label="Edit chat profile"]{background:var(--cc-panel-alt)!important;border:1px solid var(--cc-stroke)!important;color:var(--cc-icon)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] button[aria-label="Edit chat profile"] svg{color:var(--cc-icon)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] button:not([aria-label]){background:var(--cc-user)!important;border:1px solid var(--cc-stroke)!important;color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;}
[data-sentry-component="PlayerCharacterSelect"] [data-sentry-component="PlotProfileCard"] button:not([aria-label]):active{background:var(--cc-accent-hover)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"]{background:#fff!important;border:1px solid var(--cc-stroke)!important;border-radius:12px!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] button{color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;border-color:var(--cc-stroke)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] button:active{background:var(--cc-accent-soft)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] span{color:var(--cc-muted)!important;-webkit-text-fill-color:var(--cc-muted)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] span.body1{color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] svg{color:var(--cc-icon)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] .divide-y>div{border-color:var(--cc-stroke)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] .border-b{border-color:var(--cc-stroke)!important;}
[data-sentry-component="PlayerCharacterSelect"] [role="group"][aria-label="My chat profiles"] button:first-child .rounded-full{background:var(--cc-accent-soft)!important;}


/* V37: Chat profile edit full-screen modal (not the profile selection sheet) */
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="ChatProfileEditForm"]),
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="ChatProfileEditForm"]) > [role="presentation"],
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="ChatProfileEditForm"]) > div[class*="bg-gray-main"]{
 background:var(--cc-bg)!important;background-image:none!important;color:var(--cc-text)!important;
}
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="ChatProfileEditForm"]) [data-sentry-component="ModalHeader"]{
 background:#fff!important;border-bottom:1px solid var(--cc-stroke)!important;color:var(--cc-text)!important;
}
[data-sentry-component="KeyboardAvoidingView"]:has([data-sentry-component="ChatProfileEditForm"]) [data-sentry-component="ModalHeader"] :is(h3,svg){
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
}
[data-sentry-component="ChatProfileEditForm"]{background:var(--cc-bg)!important;color:var(--cc-text)!important;}
[data-sentry-component="ChatProfileEditForm"] :is(h3,span.title18,.heading3,.body16){color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;}
[data-sentry-component="ChatProfileEditForm"] section [class*="text-white/50"],
[data-sentry-component="ChatProfileEditForm"] section .body12{color:var(--cc-muted)!important;-webkit-text-fill-color:var(--cc-muted)!important;}
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="InputField"] [data-sentry-component="Input"],
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="TextareaField"] textarea{
 background:#fff!important;border:1px solid var(--cc-stroke)!important;border-radius:10px!important;
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;
 caret-color:var(--cc-accent-strong)!important;box-shadow:none!important;
}
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="InputField"] input{
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;caret-color:var(--cc-accent-strong)!important;
}
[data-sentry-component="ChatProfileEditForm"] :is(input,textarea)::placeholder{
 color:#A0A4AB!important;-webkit-text-fill-color:#A0A4AB!important;opacity:1!important;
}
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="TextareaField"] .caption12{
 color:var(--cc-accent-strong)!important;-webkit-text-fill-color:var(--cc-accent-strong)!important;
}
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="Preview"] button > div[class*="bg-primary-400"]{
 background:var(--cc-accent-strong)!important;
}
[data-sentry-component="ChatProfileEditForm"] [data-sentry-component="Preview"] button > div[class*="bg-primary-400"] svg{
 color:#fff!important;-webkit-text-fill-color:#fff!important;
}
[data-sentry-component="ChatProfileEditForm"] > button[data-sentry-component="Button"]{
 background:var(--cc-user)!important;border:1px solid var(--cc-stroke)!important;
 color:var(--cc-text)!important;-webkit-text-fill-color:var(--cc-text)!important;box-shadow:none!important;
}
[data-sentry-component="ChatProfileEditForm"] > button[data-sentry-component="Button"]:active{background:var(--cc-accent-hover)!important;}
[data-sentry-component="ChatProfileEditForm"] > button[data-sentry-component="Button"]:disabled{
 background:#F1F2F4!important;color:#A7ABB0!important;-webkit-text-fill-color:#A7ABB0!important;
}


/* Info box on light themes: Zeta supplies white text on nested spans. */
[data-sentry-component="InfoBoxContent"],
[data-sentry-component="InfoBoxExpandedContent"],
[data-sentry-component="InfoBoxCharacterSection"]{
  background:#FFFFFF!important;
  color:var(--cc-text)!important;
  -webkit-text-fill-color:var(--cc-text)!important;
}
[data-sentry-component="InfoBoxContent"] .chat,
[data-sentry-component="InfoBoxExpandedContent"] .chat,
[data-sentry-component="InfoBoxCharacterSection"] .chat,
[data-sentry-component="InfoBoxContent"] .chat span,
[data-sentry-component="InfoBoxExpandedContent"] .chat span,
[data-sentry-component="InfoBoxCharacterSection"] .chat span{
  color:var(--cc-text)!important;
  -webkit-text-fill-color:var(--cc-text)!important;
  opacity:1!important;
}
[data-sentry-component="InfoBoxContent"] .chat .font-bold,
[data-sentry-component="InfoBoxExpandedContent"] .chat .font-bold,
[data-sentry-component="InfoBoxCharacterSection"] .chat .font-bold{
  color:#34383E!important;
  -webkit-text-fill-color:#34383E!important;
  font-weight:650!important;
}
[data-sentry-component="InfoBoxContent"] .chat [class*="text-white/70"],
[data-sentry-component="InfoBoxExpandedContent"] .chat [class*="text-white/70"],
[data-sentry-component="InfoBoxCharacterSection"] .chat [class*="text-white/70"],
[data-sentry-component="InfoBoxCharacterSection"] > span.caption1{
  color:#737981!important;
  -webkit-text-fill-color:#737981!important;
  opacity:1!important;
}
[data-sentry-component="InfoBoxContent"] [data-sentry-component="InfoBoxCollapseToggle"] svg{
  color:#747981!important;
}

/* Info box spacing: compact-but-readable 2~3 step gaps. */
[data-sentry-component="InfoBoxExpandedContent"]{
  row-gap:12px!important;
}
[data-sentry-component="InfoBoxExpandedContent"] > [data-sentry-component="InfoBoxContent"],
[data-sentry-component="InfoBoxExpandedContent"] > [data-sentry-component="InfoBoxCharacterSection"]{
  row-gap:10px!important;
}

`;
(document.head||document.documentElement).appendChild(style);
let panel=null,toggle=null,editShortcut=null,observer=null,scheduled=false;
const sendOriginals=new Map();
function makeSendArrow(){
 const svg=document.querySelector('[data-testid="chat-send-button"] svg');
 if(!svg)return;
 if(!sendOriginals.has(svg))sendOriginals.set(svg,{html:svg.innerHTML,viewBox:svg.getAttribute('viewBox'),fill:svg.getAttribute('fill')});
 if(svg.dataset.ccArrow==='1')return;
 svg.setAttribute('viewBox','0 0 24 24');
 svg.setAttribute('fill','none');
 while(svg.firstChild)svg.removeChild(svg.firstChild);
 const line=document.createElementNS('http://www.w3.org/2000/svg','path');
 line.setAttribute('d','M12 19V5M5 12l7-7 7 7');
 line.setAttribute('stroke','currentColor');
 line.setAttribute('stroke-width','2.3');
 line.setAttribute('stroke-linecap','round');
 line.setAttribute('stroke-linejoin','round');
 svg.appendChild(line);svg.dataset.ccArrow='1';
}
const actionButtons=new Map();
const marked=new Set();
function save(){try{localStorage.setItem(STORE,JSON.stringify(settings));}catch(e){}}
/* Reliable inline dialogue highlighting for desktop and mobile.
   Keep the inline spans mounted when toggled off. CSS alone controls visibility.
   This avoids a remove/re-wrap race when Zeta re-renders its messages. */
const dialogueInlineClass='cc-dialogue-inline';
let dialogueUpdating=false;
function clearInlineDialogue(){
 const spans=document.querySelectorAll('span.'+dialogueInlineClass);
 for(const span of spans){
  if(!span.isConnected)continue;
  span.replaceWith(...Array.from(span.childNodes));
 }
}
function updateDialogueHighlight(){
 if(!settings.dialogueHighlight || dialogueUpdating)return;
 const room=document.querySelector('[data-sentry-component="ChatRoomReadyView"]');
 if(!room)return;
 dialogueUpdating=true;
 try{
  const chats=room.querySelectorAll(
   '[data-sentry-component="LeftTextContent"] [data-sentry-component="ChatBubbleContainer"] .chat,'+
   '[data-sentry-component="RightTextContent"] [data-sentry-component="ChatBubbleContainer"] .chat'
  );
  for(const chat of chats){
   // Loading indicators in a *different* Swiper slide must not block
   // completed dialogue in this slide. Zeta keeps the next-slide spinner
   // mounted even after the visible candidate has finished rendering.
   const slide=chat.closest('.swiper-slide');
   if(slide?.querySelector('[data-testid="message-loading"]'))continue;
   // Outside a carousel, skip a chat only when its own BodyView is loading.
   if(!slide && chat.closest('[data-sentry-component="BodyView"]')?.querySelector('[data-testid="message-loading"]'))continue;
   const walker=document.createTreeWalker(chat,NodeFilter.SHOW_TEXT);
   const nodes=[];
   let node;
   while((node=walker.nextNode())){
    if(!node.nodeValue?.trim())continue;
    const parent=node.parentElement;
    if(!parent || parent.closest('em,i,blockquote,.cc-letter,.cc-letter-meta,[contenteditable],.'+dialogueInlineClass))continue;
    // Exclude labels or metadata added by the theme.
    if(parent.closest('.cc-meta,.cc-meta-date,.cc-letter-time'))continue;
    nodes.push(node);
   }
   for(const textNode of nodes){
    if(!textNode.isConnected || textNode.parentElement?.closest('.'+dialogueInlineClass))continue;
    const span=document.createElement('span');
    span.className=dialogueInlineClass;
    textNode.parentNode.insertBefore(span,textNode);
    span.appendChild(textNode);
   }
  }
 }catch(error){console.warn('[Clean Cozy] 형광펜 적용 중 오류',error);}
 finally{dialogueUpdating=false;}
}

function applyOpts(){
 const root=document.documentElement;
 root.classList.toggle('cc-avatar-hidden',settings.avatarMode==='none');
 root.classList.toggle('cc-avatar-user-hidden',settings.avatarMode==='userHidden'||settings.avatarMode==='userHiddenHeart');
 root.classList.toggle('cc-avatar-heart',settings.avatarMode==='userHiddenHeart');
 root.classList.toggle('cc-dialogue-highlight',settings.dialogueHighlight===true);
 updateDialogueHighlight();
 if(panel)for(const input of panel.querySelectorAll('input[name="cc-avatar-mode"]'))input.checked=input.value===settings.avatarMode;
 const highlightInput=panel?.querySelector('#cc-dialogue-highlight-toggle');
 if(highlightInput)highlightInput.checked=settings.dialogueHighlight===true;
}
function getTime(body){
 const node=body.querySelector('time[datetime], [data-timestamp], [datetime]');
 if(!node)return '';
 const dt=node.getAttribute('datetime')||node.getAttribute('data-timestamp');
 if(!dt)return '';
 let date=new Date(dt);
 if(!Number.isFinite(date.getTime())&&/^\d{10,13}$/.test(dt))date=new Date(Number(dt)*(dt.length===10?1000:1));
 if(!Number.isFinite(date.getTime()))return '';
 return date.toLocaleTimeString('ko-KR',{hour:'numeric',minute:'2-digit'});
}

/* Record only the local clock time of future sends; no Zeta API access. */
const LETTER_STORE='zeta-clean-cozy-letter-send-times-v1';
let letterTimes={};
try{const saved=JSON.parse(localStorage.getItem(LETTER_STORE)||'{}');if(saved&&typeof saved==='object'&&!Array.isArray(saved))letterTimes=saved;}catch(e){}
let pendingSend=null;
/* Separate, bounded history for character letters. No message content is stored. */
const CHARACTER_LETTER_STORE='zeta-clean-cozy-character-letter-first-seen-v1';
let characterLetterTimes={};
try{
 const saved=JSON.parse(localStorage.getItem(CHARACTER_LETTER_STORE)||'{}');
 if(saved&&typeof saved==='object'&&!Array.isArray(saved))characterLetterTimes=saved;
}catch(e){}
const characterTransientTimes=new WeakMap();
function characterLetterTime(body){
 const real=getTime(body);
 if(real)return real;
 const raw=messageKey(body);
 const scoped=raw?location.pathname+'::'+raw:'';
 // A current or previously stored turn is the source of truth when available.
 let iso=turnStampForBody(body);
 if(!iso)iso=(scoped&&characterLetterTimes[scoped])||characterTransientTimes.get(body);
 if(!iso||!Number.isFinite(new Date(iso).getTime())){
  // Existing behavior: unknown old letters show first-observed time.
  // Such a timestamp never turns an old message into "today".
  iso=new Date().toISOString();
  characterTransientTimes.set(body,iso);
 }
 return new Date(iso).toLocaleTimeString('ko-KR',{hour:'numeric',minute:'2-digit'});
}
function messageKey(body){
 // Prefer BodyView's real id, including when the outer virtual row is local-reply-N.
 const view=body.closest('[data-sentry-component="BodyView"]');
 if(view?.id?.startsWith('message-'))return view.id;
 const outer=body.closest('[data-key], [id^="message-"]');
 const raw=outer?.getAttribute('data-key')||outer?.id||'';
 return raw.startsWith('message-')?raw:'';
}
function storeLetterTime(key,iso){
 if(!key||!iso)return;
 letterTimes[key]=iso;
 const entries=Object.entries(letterTimes);
 if(entries.length>400)letterTimes=Object.fromEntries(entries.slice(-400));
 try{localStorage.setItem(LETTER_STORE,JSON.stringify(letterTimes));}catch(e){}
}
function readLetterTime(body){
 const real=getTime(body);
 if(real)return real;
 const saved=turnStampForBody(body)||letterTimes[messageKey(body)];
 if(!saved)return '';
 const date=new Date(saved);
 return Number.isFinite(date.getTime())?date.toLocaleTimeString('ko-KR',{hour:'numeric',minute:'2-digit'}):'';
}
function captureSend(){
 if(!document.querySelector('[data-sentry-component="ChatRoomReadyView"]'))return;
 const input=document.querySelector('[data-testid="composer-input-box"] textarea[name="message"]');
 if(!input||!input.value.trim())return;
 const known=new Set([...document.querySelectorAll('[data-sentry-component="RightTextContent"]')].map(messageKey).filter(Boolean));
 pendingSend={time:new Date().toISOString(),known,created:Date.now()};
 beginTurnCapture(pendingSend.time);
}
function onSendClick(event){if(event.target.closest?.('[data-testid="chat-send-button"]'))captureSend();}
function onSendKey(event){
 if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing&&event.target.matches?.('textarea[name="message"]'))captureSend();
}
/* V40: Present the actual character name in the room header, without editing the plot title. */
let previousHeaderElement=null;
let previousHeaderText='';
let appliedHeaderText='';
function enhanceHeader(){
 const header=document.querySelector('[data-sentry-component="ChatRoomReadyView"] [data-testid="chat-header-profile"] span');
 if(!header)return;
 const characterBody=document.querySelector('[data-sentry-component="ChatRoomReadyView"] [data-sentry-component="LeftTextContent"]');
 if(!characterBody)return;
 const avatarName=characterBody.querySelector('button img[alt]')?.getAttribute('alt')?.trim()||'';
 const displayedName=characterBody.querySelector('.cc-meta-name')?.textContent?.trim()||
  characterBody.querySelector('.caption1')?.textContent?.trim()||'';
 const validName=name=>Boolean(name&&!/^#[0-9a-f]{3,8}$/i.test(name)&&name!=='­');
 const name=[avatarName,displayedName].find(validName);
 if(!name)return;
 if(header!==previousHeaderElement){
  previousHeaderElement=header;
  previousHeaderText=header.textContent||'';
  appliedHeaderText='';
 }
 if(header.textContent!==name){
  // Save React's newest header title when it changes outside our code.
  if(header.textContent!==appliedHeaderText)previousHeaderText=header.textContent||'';
  header.textContent=name;
 }
 appliedHeaderText=name;
}
function restoreHeader(){
 if(previousHeaderElement?.isConnected&&previousHeaderElement.textContent===appliedHeaderText){
  previousHeaderElement.textContent=previousHeaderText;
 }
 previousHeaderElement=null;
}
function enhanceLetters(){
 const bodies=document.querySelectorAll('[data-sentry-component="RightTextContent"],[data-sentry-component="LeftTextContent"]');
 for(const body of bodies){
  const bubble=body.querySelector('[data-sentry-component="ChatBubbleContainer"]');
  if(!bubble)continue;
  const quotes=bubble.querySelectorAll('blockquote');
  if(!quotes.length)continue;
  const isUser=body.matches('[data-sentry-component="RightTextContent"]');
  const key=messageKey(body);
  const ownName=body.querySelector('.cc-meta-name')?.textContent?.trim()||body.querySelector('.caption1')?.textContent?.trim();
  // Prefer the character's actual chat identity, NOT the plot/room title.
  // Avatar alt is the most reliable identity across rooms with blank or hex-color plot names.
  const characterBody=document.querySelector('[data-sentry-component="LeftTextContent"]');
  const avatarName=characterBody?.querySelector(':scope button img[alt]')?.getAttribute('alt')?.trim()||'';
  const displayedCharacter=characterBody?.querySelector('.cc-meta-name')?.textContent?.trim()||
   characterBody?.querySelector('.caption1')?.textContent?.trim()||'';
  const plotTitle=document.querySelector('[data-testid="chat-header-profile"] span')?.textContent?.trim()||'';
  const validName=name=>Boolean(name&&!/^#[0-9a-f]{3,8}$/i.test(name)&&name!=='­');
  const roomCharacter=[avatarName,displayedCharacter,plotTitle].find(validName)||'캐릭터';
  const roomUser=document.querySelector('[data-sentry-component="RightTextContent"] .cc-meta-name')?.textContent?.trim()||'나';
  const sender=isUser?(ownName||roomUser):(ownName||roomCharacter);
  const recipient=isUser?roomCharacter:roomUser;
  const time=isUser?readLetterTime(body):characterLetterTime(body);
  for(const quote of quotes){
   quote.classList.add('cc-letter');
   let header=quote.querySelector(':scope > .cc-letter-meta');
   if(!header){header=document.createElement('div');header.className='cc-letter-meta';quote.prepend(header);}
   const signature=sender+'|'+recipient+'|'+time;
   if(header.dataset.signature!==signature){
    header.replaceChildren();
    const stamp=document.createElement('span');stamp.className='cc-letter-stamp';stamp.textContent='✉';
    const who=document.createElement('span');who.textContent=sender+' → '+recipient;
    header.append(stamp,who);
    if(time){const timestamp=document.createElement('span');timestamp.className='cc-letter-time';timestamp.textContent='· '+time;header.append(timestamp);}
    header.dataset.signature=signature;
   }
  }
 }
 if(pendingSend&&Date.now()-pendingSend.created>60000)pendingSend=null;
}

/* V27: one timestamp per user+character TURN, max 300 turns.
   No internal APIs. No automated actions. Only DOM read + user-initiated Send event.
   A BodyView can contain multiple LeftTextContent bubbles; all share its turn.
   Existing V15–V26 stores are left untouched (read-only fallbacks for letters). */
const TURN_STORE='zeta-clean-cozy-turn-dates-v1';
const TURN_LIMIT=300;
let turns=[];
try{
 const loaded=JSON.parse(localStorage.getItem(TURN_STORE)||'[]');
 if(Array.isArray(loaded))turns=loaded.filter(x=>x&&typeof x==='object'&&typeof x.room==='string'&&typeof x.time==='string'&&typeof x.user==='string').slice(-TURN_LIMIT);
}catch(e){}
let turnPending=null;
let dateRefreshTimer=null;
let turnRoomPath='';
let knownViewKeys=new Set();
let knownViewElements=new WeakSet();
const liveTurnTimes=new WeakMap();
function currentRoomMessageBodies(){
 return document.querySelectorAll('[data-sentry-component="ChatRoomReadyView"] :is([data-sentry-component="LeftTextContent"],[data-sentry-component="RightTextContent"])');
}
function viewOf(body){return body.closest('[data-sentry-component="BodyView"]');}
function rowOf(body){return viewOf(body)?.closest('[data-index]');}
function rowIndex(body){
 const value=rowOf(body)?.getAttribute('data-index');
 return value===null||value===undefined?NaN:Number(value);
}
function scopedKey(body){
 const id=messageKey(body);
 return id?location.pathname+'::'+id:'';
}
function resetTurnRoom(){
 turnRoomPath=location.pathname;
 knownViewKeys=new Set();
 knownViewElements=new WeakSet();
 for(const body of currentRoomMessageBodies()){
  const view=viewOf(body);
  if(view)knownViewElements.add(view);
  const key=scopedKey(body);
  if(key)knownViewKeys.add(key);
 }
 turnPending=null;
}
function beginTurnCapture(iso){
 if(turnRoomPath!==location.pathname)resetTurnRoom();
 const known=new Set(knownViewKeys);
 const knownElements=new WeakSet();
 for(const body of currentRoomMessageBodies()){
  const view=viewOf(body);
  if(view)knownElements.add(view);
  const key=scopedKey(body);
  if(key)known.add(key);
 }
 turnPending={room:location.pathname,time:iso,started:Date.now(),known,knownElements,user:null,userView:null,userIndex:NaN,characterFound:false};
}
function saveTurns(){
 if(turns.length>TURN_LIMIT)turns=turns.slice(-TURN_LIMIT);
 try{localStorage.setItem(TURN_STORE,JSON.stringify(turns));}catch(e){}
}
function recordUserTurn(body,time){
 const user=scopedKey(body);
 if(!user)return null;
 const existing=turns.find(x=>x.room===location.pathname&&x.user===user);
 if(existing)return existing;
 const record={room:location.pathname,user,time};
 turns.push(record);
 saveTurns();
 return record;
}
function turnForBody(body){
 const key=scopedKey(body);
 if(!key)return null;
 const isUser=body.matches('[data-sentry-component="RightTextContent"]');
 return turns.find(x=>x.room===location.pathname&&(isUser?x.user===key:x.character===key))||null;
}
function turnStampForBody(body){
 const view=viewOf(body);
 const found=turnForBody(body);
 return found?.time||(view?liveTurnTimes.get(view):'')||'';
}
function relativeDate(iso){
 const stamp=new Date(iso);
 if(!Number.isFinite(stamp.getTime()))return '';
 const now=new Date();
 const days=Math.round((Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())-Date.UTC(stamp.getFullYear(),stamp.getMonth(),stamp.getDate()))/86400000);
 return days<0?'':days===0?'today':days===1?'1 day ago':days+' days ago';
}
function nearestUserTurn(body){
 const index=rowIndex(body);
 if(!Number.isFinite(index))return null;
 // In Zeta's supplied HTML the next character BodyView is index user+1.
 // Compare rendered rows, never treat merely newly virtualized history as a reply.
 const users=[...currentRoomMessageBodies()].filter(x=>x.matches('[data-sentry-component="RightTextContent"]'));
 let best=null,bestIndex=-Infinity;
 for(const userBody of users){
  const userIndex=rowIndex(userBody);
  if(userIndex>=index||userIndex<=bestIndex)continue;
  const row=turnForBody(userBody);
  if(!row)continue;
  best=row;bestIndex=userIndex;
 }
 return best&&index-bestIndex<=2?best:null;
}
function enhanceDates(){
 if(!document.querySelector('[data-sentry-component="ChatRoomReadyView"]'))return;
 if(turnRoomPath!==location.pathname)resetTurnRoom();
 if(turnPending&&(turnPending.room!==location.pathname||Date.now()-turnPending.started>180000))turnPending=null;
 const bodies=[...currentRoomMessageBodies()];
 // Resolve newly rendered user view first, independently of DOM query order.
 if(turnPending&&!turnPending.user){
  for(const body of bodies){
   if(!body.matches('[data-sentry-component="RightTextContent"]'))continue;
   const view=viewOf(body),key=scopedKey(body);
   if(!view||!key||turnPending.known.has(key)||turnPending.knownElements.has(view))continue;
   const record=recordUserTurn(body,turnPending.time);
   if(!record)continue;
   turnPending.user=record;
   turnPending.userView=view;
   turnPending.userIndex=rowIndex(body);
   liveTurnTimes.set(view,record.time);
   break;
  }
 }
 // One character BodyView can hold 1, 2, or more bubbles.
 // Attach at most once to the user turn immediately preceding it.
 for(const body of bodies){
  if(!body.matches('[data-sentry-component="LeftTextContent"]'))continue;
  const view=viewOf(body);
  if(!view)continue;
  const key=scopedKey(body);
  const isFresh=!!(turnPending&&turnPending.user&&(key?!turnPending.known.has(key):!turnPending.knownElements.has(view)));
  const idx=rowIndex(body);
  const adjacent=isFresh&&Number.isFinite(idx)&&Number.isFinite(turnPending.userIndex)&&idx>turnPending.userIndex&&idx-turnPending.userIndex<=2;
  if(adjacent){
   const record=turnPending.user;
   liveTurnTimes.set(view,record.time);
   if(key&&record.character!==key){record.character=key;saveTurns();}
   turnPending.characterFound=true;
  }else if(!turnForBody(body)){
   // Recover stable local-reply ids, when user and character share the same visible turn.
   const match=nearestUserTurn(body);
   if(match){
    liveTurnTimes.set(view,match.time);
    if(key&&match.character!==key){match.character=key;saveTurns();}
   }
  }
 }
 for(const body of bodies){
  const view=viewOf(body),key=scopedKey(body);
  if(view)knownViewElements.add(view);
  if(key)knownViewKeys.add(key);
  const bubble=body.querySelector('[data-sentry-component="ChatBubbleContainer"]');
  const meta=bubble?.querySelector(':scope > .cc-meta');
  if(!meta)continue;
  const stamp=turnStampForBody(body);
  const label=stamp?relativeDate(stamp):'';
  let tag=meta.querySelector(':scope > .cc-meta-date');
  if(label){
   if(!tag){tag=document.createElement('span');tag.className='cc-meta-date';meta.appendChild(tag);}
   if(tag.textContent!=='· '+label)tag.textContent='· '+label;
  }else if(tag)tag.remove();
 }
 if(turnPending?.characterFound)turnPending=null;
 if(pendingSend&&Date.now()-pendingSend.created>60000)pendingSend=null;
}

function enhance(){
 const bodies=document.querySelectorAll('[data-sentry-component="LeftTextContent"],[data-sentry-component="RightTextContent"]');
 for(const body of bodies){
  const bubble=body.querySelector('[data-sentry-component="ChatBubbleContainer"]');
  if(!bubble||bubble.querySelector(':scope>.cc-meta'))continue;
  const label=body.querySelector('.caption1');
  if(!label)continue;
  const name=(label.textContent||'').trim();
  if(!name)continue;
  const meta=document.createElement('div');meta.className='cc-meta';meta.setAttribute('aria-label','메시지 작성자');
  const nameSpan=document.createElement('span');nameSpan.className='cc-meta-name';nameSpan.textContent=name;meta.appendChild(nameSpan);
  const time=getTime(body);
  if(time){const timeSpan=document.createElement('span');timeSpan.className='cc-meta-time';timeSpan.textContent='· '+time;meta.appendChild(timeSpan);}
  bubble.insertBefore(meta,bubble.firstChild);
  label.classList.add('cc-name-hidden');
  marked.add(label);
 }
}

/* V32: Line tool is a user-clicked, local presentation formatter.
   No network calls, no automated native button clicks, no Zeta data changes.
   If the native editing textarea is open, format its draft; user manually saves. */
let lineShortcut=null;
function compactMarkdownPlain(raw){
 let t=raw.replace(/\r\n?/g,'\n').trim();
 if(!t)return t;
 // Compact ordinary text while preserving the original quote-card separation.
 t=t.replace(/[ \t]*\n[ \t]*/g,' ').replace(/[ \t]{2,}/g,' ');
 t=t.replace(/(^|\s)>[ \t]*(?=\S)/g,'\n> ');
 t=t.replace(/(>[^\n]*?)\s+(?=\*[^*\n]+\*)/g,'$1\n');
 const lines=t.split('\n').map(x=>x.trim()).filter(Boolean);
 const result=[];
 for(const line of lines){
  if(/^>/.test(line))result.push(line);
  else if(result.length&&/^>/.test(result[result.length-1]))result.push(line);
  else if(result.length)result[result.length-1]+=' '+line;
  else result.push(line);
 }
 return result.map((line,i)=>{
  if(i===0)return line;
  const previous=result[i-1];
  return (line.startsWith('>')&&previous.startsWith('>')?'\n':'\n\n')+line;
 }).join('');
}
function compactMarkdown(raw){
 // Protect complete ```InfoBox ... ``` code fences byte-for-byte, including
 // internal blank lines, spaces, item order, and line breaks.
 const text=raw.replace(/\r\n?/g,'\n');
 const blockRe=/^```[ \t]*InfoBox[^\n]*\n[\s\S]*?^```[ \t]*(?=\n|$)/gmi;
 const parts=[];
 let last=0, match;
 while((match=blockRe.exec(text))!==null){
  parts.push({type:'ordinary',value:text.slice(last,match.index)});
  parts.push({type:'infobox',value:match[0]});
  last=blockRe.lastIndex;
 }
 parts.push({type:'ordinary',value:text.slice(last)});
 // Don't compact an unfinished InfoBox while its editor content is incomplete.
 const tail=parts[parts.length-1];
 const open=tail.value.match(/^```[ \t]*InfoBox[^\n]*(?:\n|$)/gmi);
 if(open && open.length%2===1){
  const pos=tail.value.lastIndexOf(open[open.length-1]);
  const before=tail.value.slice(0,pos);
  const protectedTail=tail.value.slice(pos);
  tail.value=before;
  parts.push({type:'infobox',value:protectedTail});
 }
 let output='';
 for(const part of parts){
  if(part.type==='infobox'){
   // Exactly three empty lines above each InfoBox (four newline characters).
   output=output.replace(/\n+$/,'')+'\n\n\n\n'+part.value;
  }else{
   const compact=compactMarkdownPlain(part.value);
   if(!compact)continue;
   output+=(output && !output.endsWith('\n')?'\n\n':'')+compact;
  }
 }
 return output;
}
let lineEditPending=false;
let lineEditExpiresAt=0;
let lineEditOpenTimer=null;
function formatEditTextarea(textarea){
 if(!textarea)return false;
 const formatted=compactMarkdown(textarea.value);
 if(formatted!==textarea.value){
  const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')?.set;
  if(setter)setter.call(textarea,formatted);
  else textarea.value=formatted;
  textarea.dispatchEvent(new Event('input',{bubbles:true}));
 }
 textarea.focus();
 return true;
}
function finishPendingLineEdit(){
 if(!lineEditPending)return;
 if(Date.now()>lineEditExpiresAt){lineEditPending=false;return;}
 const field=document.querySelector('[data-sentry-component="EditModeInputPanelContent"] textarea[name="message"]');
 if(!field)return;
 // Do not change anything else after formatting; native Save/Cancel stays with the user.
 lineEditPending=false;
 if(lineEditOpenTimer){clearTimeout(lineEditOpenTimer);lineEditOpenTimer=null;}
 formatEditTextarea(field);
}
function pressLineTool(){
 const field=document.querySelector('[data-sentry-component="EditModeInputPanelContent"] textarea[name="message"]');
 if(field){formatEditTextarea(field);return;}
 const edit=document.querySelector('[data-sentry-component="LastMessageControlBar"] button[aria-label="Edit message"]');
 if(!edit||edit.disabled)return;
 lineEditPending=true;
 lineEditExpiresAt=Date.now()+5000;
 // One native Edit click in direct response to the user's click; never auto-save.
 edit.click();
 // React may mount the textarea in a later render.
 finishPendingLineEdit();
 if(lineEditOpenTimer)clearTimeout(lineEditOpenTimer);
 lineEditOpenTimer=setTimeout(()=>{finishPendingLineEdit();lineEditPending=false;lineEditOpenTimer=null;},750);
}

function schedule(){
 if(scheduled)return;
 scheduled=true;
 requestAnimationFrame(()=>{scheduled=false;finishPendingLineEdit();enhance();enhanceHeader();enhanceDates();enhanceLetters();updateDialogueHighlight();makeSendArrow();updateActionAvailability();});
}
const actions=[
 ['suggest','추천답변','[data-sentry-component="QuickReplyButton"] button[aria-label="Suggested replies"]'],
 ['snapshot','스냅샷','[data-sentry-component="LastMessageControlBar"] [data-sentry-component="SnapshotButton"] button'],
 ['report','신고','[data-sentry-component="LastMessageControlBar"] button[aria-label="Report message"]'],
 ['edit','수정','[data-sentry-component="LastMessageControlBar"] button[aria-label="Edit message"]'],
 ['request','마법봉','[data-sentry-component="LastMessageControlBar"] button[aria-label="Regenerate with a request"]'],
 ['regen','새 답변','[data-sentry-component="LastMessageControlBar"] button[aria-label="Regenerate answers"]']
];

/* Anchor settings to the viewport, never to a conditional scroll button.
   Native jump-to-latest is 32px wide; match its right edge and button size. */
function positionControls(){
 if(!toggle||!panel)return;
 const chatRoom=document.querySelector('[data-sentry-component="ChatRoomReadyView"]');
 // Desktop content is centered inside a full-width chat room. Anchor to the
 // narrower composer (or the centered message column), not the outer room.
 const anchor=document.querySelector('[data-testid="composer-input-box"]')
   ||document.querySelector('[role="log"][aria-label="Chat messages"] [data-sentry-component="BodyView"]')
   ||chatRoom;
 const chatRect=anchor?.getBoundingClientRect();
 const right=(chatRect&&chatRect.width>0?Math.max(8,window.innerWidth-chatRect.right+8):8)+'px';
 const bottom='120px';
 toggle.style.setProperty('right',right,'important');
 toggle.style.setProperty('bottom',bottom,'important');
 panel.style.setProperty('right',right,'important');
 panel.style.setProperty('bottom','160px','important');
 if(editShortcut){editShortcut.style.setProperty('right',right,'important');editShortcut.style.setProperty('bottom','164px','important');}
 if(lineShortcut){lineShortcut.style.setProperty('right',right,'important');lineShortcut.style.setProperty('bottom','208px','important');}
}

function updateActionAvailability(){
 positionControls();
 const isChat=!!document.querySelector('[data-sentry-component="ChatRoomReadyView"]');
 document.documentElement.classList.toggle('cc-tools-ready',isChat&&!!panel);
 if(editShortcut){const original=document.querySelector(actions.find(a=>a[0]==='edit')[2]);editShortcut.disabled=!isChat||!original||original.disabled;}
 for(const [key,,selector] of actions){
  const btn=actionButtons.get(key);
  if(btn)btn.disabled=!isChat||!document.querySelector(selector);
 }
}
function runOriginalAction(key){
 const def=actions.find(a=>a[0]===key);
 if(!def)return;
 const original=document.querySelector(def[2]);
 if(!original||original.disabled)return;
 panel.hidden=true;
 original.click();
}
function onSettingsOutsidePointer(event){
 if(!panel||panel.hidden)return;
 const target=event.target;
 if(target instanceof Node&&(panel.contains(target)||toggle?.contains(target)))return;
 panel.hidden=true;
}
function makeControls(){
 lineShortcut=document.createElement('button');lineShortcut.id='cc-line-shortcut';lineShortcut.type='button';
 lineShortcut.title='수정창에서 줄 정리 (저장은 직접)';
 lineShortcut.setAttribute('aria-label','수정창 열고 줄 정리');
 lineShortcut.innerHTML='<svg viewBox="0 0 24 24" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 11h11M4 16h16M4 21h9"/></svg>';
 lineShortcut.addEventListener('click',pressLineTool);
 editShortcut=document.createElement('button');editShortcut.id='cc-edit-shortcut';editShortcut.type='button';
 editShortcut.title='메시지 수정';editShortcut.setAttribute('aria-label','Edit message');editShortcut.textContent='✎';
 editShortcut.addEventListener('click',()=>runOriginalAction('edit'));
 toggle=document.createElement('button');toggle.id='cc-toggle';toggle.type='button';toggle.title='클린 코지 설정 및 채팅 도구';toggle.setAttribute('aria-label','클린 코지 설정 및 채팅 도구');toggle.textContent='⚙';
 panel=document.createElement('div');panel.id='cc-panel';panel.hidden=true;
 const avatarTitle=document.createElement('div');avatarTitle.className='cc-section-title';avatarTitle.textContent='프로필 사진';panel.appendChild(avatarTitle);
 const avatarGroup=document.createElement('div');avatarGroup.className='cc-avatar-options';avatarGroup.setAttribute('role','radiogroup');avatarGroup.setAttribute('aria-label','프로필 사진 표시 방식');
 for(const [value,title] of [
  ['both','모두 표시'],
  ['none','모두 숨기기'],
  ['userHidden','유저만 숨기기'],
  ['userHiddenHeart','유저 숨김 + 캐릭터 ♥']
 ]){
  const label=document.createElement('label');label.className='cc-avatar-option';
  const input=document.createElement('input');input.type='radio';input.name='cc-avatar-mode';input.value=value;input.checked=settings.avatarMode===value;
  input.addEventListener('change',()=>{if(!input.checked)return;settings.avatarMode=value;save();applyOpts();});
  const text=document.createElement('span');text.textContent=title;
  label.append(input,text);avatarGroup.appendChild(label);
 }
 panel.appendChild(avatarGroup);
 const highlightTitle=document.createElement('div');highlightTitle.className='cc-section-title';highlightTitle.textContent='대사 꾸미기';panel.appendChild(highlightTitle);
 const highlightLabel=document.createElement('label');highlightLabel.className='cc-avatar-option';highlightLabel.setAttribute('for','cc-dialogue-highlight-toggle');
 const highlightCheckbox=document.createElement('input');highlightCheckbox.id='cc-dialogue-highlight-toggle';highlightCheckbox.type='checkbox';highlightCheckbox.checked=settings.dialogueHighlight===true;
 highlightCheckbox.addEventListener('change',()=>{settings.dialogueHighlight=highlightCheckbox.checked;save();applyOpts();});
 const highlightText=document.createElement('span');highlightText.textContent='대사 형광펜';
 highlightLabel.append(highlightCheckbox,highlightText);panel.appendChild(highlightLabel);
 const section=document.createElement('div');section.className='cc-section-title';section.textContent='채팅 도구';panel.appendChild(section);
 const list=document.createElement('div');list.className='cc-action-list';
 for(const [key,title] of actions){
  if(key==='edit')continue;
  const btn=document.createElement('button');btn.className='cc-action';btn.type='button';btn.textContent=title;
  btn.addEventListener('click',()=>runOriginalAction(key));
  actionButtons.set(key,btn);list.appendChild(btn);
 }
 panel.appendChild(list);
 toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;updateActionAvailability();});
 // Close when the user clicks outside the settings panel and gear button.
 document.addEventListener('pointerdown',onSettingsOutsidePointer,true);
 document.body.append(toggle,editShortcut,lineShortcut,panel);applyOpts();updateActionAvailability();
 window.addEventListener('resize',positionControls);
}
function stop(){clearInlineDialogue();restoreHeader();lineEditPending=false;if(lineEditOpenTimer)clearTimeout(lineEditOpenTimer);if(dateRefreshTimer)clearInterval(dateRefreshTimer);document.removeEventListener('click',onSendClick,true);document.removeEventListener('keydown',onSendKey,true);window.removeEventListener('resize',positionControls);document.removeEventListener('pointerdown',onSettingsOutsidePointer,true);observer?.disconnect();toggle?.remove();editShortcut?.remove();lineShortcut?.remove();panel?.remove();actionButtons.clear();document.documentElement.classList.remove('cc-tools-ready');for(const [svg,old] of sendOriginals){
  if(!svg.isConnected)continue;
  svg.innerHTML=old.html;
  if(old.viewBox===null)svg.removeAttribute('viewBox');else svg.setAttribute('viewBox',old.viewBox);
  if(old.fill===null)svg.removeAttribute('fill');else svg.setAttribute('fill',old.fill);
  delete svg.dataset.ccArrow;
 }sendOriginals.clear();
 document.querySelectorAll('.cc-meta-date').forEach(el=>el.remove());document.querySelectorAll('.cc-letter-meta').forEach(el=>el.remove());document.querySelectorAll('blockquote.cc-letter').forEach(el=>el.classList.remove('cc-letter'));document.querySelectorAll('.cc-meta').forEach(el=>el.remove());for(const el of marked)el.classList.remove('cc-name-hidden');marked.clear();document.documentElement.classList.remove('cc-avatar-hidden','cc-avatar-user-hidden','cc-avatar-heart','cc-dialogue-highlight');style.remove();if(window[KEY]?.stop===stop)delete window[KEY];}
document.addEventListener('click',onSendClick,true);document.addEventListener('keydown',onSendKey,true);dateRefreshTimer=setInterval(()=>{if(document.querySelector('.cc-meta-date'))schedule();},60000);applyOpts();makeControls();resetTurnRoom();enhance();enhanceHeader();enhanceDates();enhanceLetters();makeSendArrow();observer=new MutationObserver(schedule);observer.observe(document.body,{childList:true,subtree:true});window[KEY]={stop,version:VERSION,palette:chosenKey};
})();
