---
title: Home
desciption: Josh Hall's homepage
---

{% assign pages = site.pages | sort: 'url' %}
- Pages
{%- for page in pages -%}
    {%- if page.title %}
    - [{{ page.title }}]({{ page.url }})
    {%- endif -%}
{%- endfor %}
- Posts
{%- for cat in site.categories %}
    - {{ cat[0] }}
    {%- for post in cat[1] %}
        - [{{ post.title }}]({{ post.url }})
    {%- endfor -%}
{%- endfor -%}