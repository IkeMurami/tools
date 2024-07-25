import js_beatifier from 'js-beautify'


export const beautify_html = (content: string): string => js_beatifier.html(content)

export const beautify_js = (content: string): string => js_beatifier.js(content)

export const beautify_css = (content: string): string => js_beatifier.css(content)
