/**
 * Downloads an HTML document styled as a formal Arabic legal document
 */
export function downloadDocument(title, sections, type = 'document') {
  const content = sections.map(s => {
    if (s.heading) return `<h2 style="color:#1a365d;border-bottom:2px solid #d4af37;padding-bottom:8px;margin-top:24px;">${s.heading}</h2>`
    if (s.text) return `<p style="line-height:2;text-align:justify;margin:12px 0;">${s.text}</p>`
    if (s.list) return `<ul style="line-height:2.2;padding-right:20px;">${s.list.map(li => `<li>${li}</li>`).join('')}</ul>`
    return ''
  }).join('\n')

  const html = `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Cairo', 'Tajawal', sans-serif; background: #fff; color: #1a202c; padding: 60px 50px; max-width: 800px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 3px double #d4af37; padding-bottom: 30px; margin-bottom: 30px; }
  .header h1 { font-size: 24px; color: #1a365d; margin-bottom: 8px; font-family: 'Tajawal', sans-serif; }
  .header .subtitle { color: #718096; font-size: 13px; }
  .header .logo { font-size: 14px; color: #d4af37; font-weight: 700; margin-bottom: 12px; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #a0aec0; font-size: 11px; }
  h2 { font-family: 'Tajawal', sans-serif; font-size: 18px; }
  p, li { font-size: 15px; color: #2d3748; }
  @media print { body { padding: 30px; } }
</style>
</head>
<body>
<div class="header">
  <div class="logo">محمد سامي — مستشار قانوني</div>
  <h1>${title}</h1>
  <div class="subtitle">${type === 'form' ? 'نموذج قانوني جاهز للاستخدام' : type === 'law' ? 'نص قانوني' : 'وثيقة قانونية'} — ${new Date().toLocaleDateString('ar-EG')}</div>
</div>
${content}
<div class="footer">
  <p>هذه الوثيقة من مكتبة المستشار القانوني محمد سامي — للاستخدام الاسترشادي فقط</p>
  <p>يرجى مراجعة المستشار القانوني المختص قبل الاستخدام في أي إجراء قانوني</p>
</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Opens an external download link (for books/PDFs from archive.org etc.)
 */
export function downloadExternal(url, title) {
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.download = title || ''
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
