import streamlit as st
import streamlit.components.v1 as components
import os
import base64

# Configure Streamlit Page
st.set_page_config(
    page_title="Sakshi Runghe | Data Analyst Portfolio",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to hide Streamlit chrome for full-screen immersive portfolio
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding: 0rem !important;
            margin: 0rem !important;
            max-width: 100% !important;
        }
        iframe {
            border: none;
            width: 100vw !important;
            height: 100vh !important;
            position: fixed;
            top: 0;
            left: 0;
        }
    </style>
""", unsafe_allow_html=True)

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as img_file:
            return base64.b64encode(img_file.read()).decode()
    return ""

def build_standalone_html():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    index_path = os.path.join(base_dir, "index.html")
    css_path = os.path.join(base_dir, "css", "style.css")
    js_path = os.path.join(base_dir, "js", "script.js")

    if not os.path.exists(index_path):
        return "<h1>Error: index.html not found</h1>"

    with open(index_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Embed CSS
    if os.path.exists(css_path):
        with open(css_path, "r", encoding="utf-8") as f:
            css_content = f.read()
        html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>{css_content}</style>')

    # Embed JS
    if os.path.exists(js_path):
        with open(js_path, "r", encoding="utf-8") as f:
            js_content = f.read()
        html = html.replace('<script src="js/script.js"></script>', f'<script>{js_content}</script>')

    # Convert asset images to Base64
    assets_dir = os.path.join(base_dir, "assets")
    if os.path.exists(assets_dir):
        for img_name in os.listdir(assets_dir):
            if img_name.endswith(('.jpg', '.png', '.jpeg', '.webp', '.svg')):
                img_path = os.path.join(assets_dir, img_name)
                b64_str = get_base64_image(img_path)
                mime = "image/jpeg" if img_name.endswith(('.jpg', '.jpeg')) else "image/png"
                html = html.replace(f'assets/{img_name}', f'data:{mime};base64,{b64_str}')

    return html

# Render App
standalone_html = build_standalone_html()
components.html(standalone_html, height=1200, scrolling=True)
