const t = `
.dark .bili-dyn-card-video__body,
.dark .bili-dyn-card-ugc__wrap,
.dark .bili-dyn-card-goods .bili-dyn-card-goods__wrap,
.dark .reference .bili-dyn-card-goods__wrap,
.dark .bili-dyn-card-reserve .bili-dyn-card-reserve__card,
.dark .reference .bili-dyn-card-reserve__card 
{
  background-color:var(--w-bg-darker) !important;
  color:var(--w-text) !important;
  border: 1px solid var(--w-border-dark) !important;
}
.dark .bili-dyn-up-list__item__name {
  color:var(--w-text) !important;
}

.dark .bili-dyn-up-list__item__name:hover {
  color:var(--w-blue-link-hover) !important;
}

`
export default t
