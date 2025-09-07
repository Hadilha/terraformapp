# flask-app/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import os
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Path to your project root
PROJECT_ROOT = "/app"

def scan_folder(path, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = {
            'node_modules', '.git', '.terraform', '__pycache__',
            'dist', '.angular', '.vscode', 'public', 'cache',
            'etc', 'usr', 'bin', 'lib'   # 🚨 ignore system dirs
        }
    structure = {"files": [], "folders": []}
    try:
        for item in os.listdir(path):
            if item in ignore_dirs:
                continue
            item_path = os.path.join(path, item)
            if os.path.isfile(item_path):
                structure["files"].append(item)
            elif os.path.isdir(item_path):
                nested = scan_folder(item_path, ignore_dirs)
                if nested["files"] or nested["folders"]:
                    structure["folders"].append({"name": item, "contents": nested})
    except (PermissionError, FileNotFoundError):   # 🚨 catch missing files too
        pass
    return structure















    loc = {"angular": 0, "flask": 0, "terraform": 0, "total": 0}
    for root, _, files in os.walk(PROJECT_ROOT):
        for file in files:
            path = os.path.join(root, file)
            ext = os.path.splitext(file)[1]
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    lines = len(f.readlines())
                if 'angular-app' in root:
                    loc['angular'] += lines
                elif 'flask-app' in root:
                    loc['flask'] += lines
                elif file.endswith('.tf'):
                    loc['terraform'] += lines
                loc['total'] += lines
            except (UnicodeDecodeError, PermissionError, IsADirectoryError):
                pass
    return loc
def count_lines_of_code():
    loc = {"angular": 0, "flask": 0, "terraform": 0, "total": 0}
    ignore_dirs = {'node_modules', 'dist', '.angular', '.terraform', '__pycache__'}

    for root, _, files in os.walk(PROJECT_ROOT):
        # Skip ignored directories
        if any(ignored in root for ignored in ignore_dirs):
            continue

        for file in files:
            path = os.path.join(root, file)
            ext = os.path.splitext(file)[1]
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    lines = len(f.readlines())
                if 'angular-app' in root and 'node_modules' not in root:
                    loc['angular'] += lines
                elif 'flask-app' in root:
                    loc['flask'] += lines
                elif file.endswith('.tf'):
                    loc['terraform'] += lines
                loc['total'] += lines
            except (UnicodeDecodeError, PermissionError, IsADirectoryError):
                pass
    return loc
def detect_tech_stack():
    stack = []
    if os.path.exists(os.path.join(PROJECT_ROOT, 'angular-app')):
        stack.append("Angular")
    if os.path.exists(os.path.join(PROJECT_ROOT, 'flask-app')):
        stack.append("Flask")
    if any(f.endswith('.tf') for f in os.listdir(PROJECT_ROOT)):
        stack.append("Terraform")
    if os.path.exists(os.path.join(PROJECT_ROOT, 'docker-compose.yml')):
        stack.append("Docker Compose")
    workflows = os.path.join(PROJECT_ROOT, '.github', 'workflows')
    if os.path.exists(workflows):
        stack.append("GitHub Actions")
    return stack

def detect_infrastructure():
    files = os.listdir(PROJECT_ROOT)
    return {
        "terraform": any(f.endswith('.tf') for f in files),
        "dockerCompose": 'docker-compose.yml' in files,
        "ciCd": os.path.exists(os.path.join(PROJECT_ROOT, '.github', 'workflows'))
    }

def analyze_code_quality():
    quality = {"issues": [], "score": 100}

    # Check for README.md in project root
    if not os.path.exists(os.path.join(PROJECT_ROOT, 'README.md')):
        quality["issues"].append("No README.md found — consider adding project documentation.")
        quality["score"] -= 10

    # Check for meaningful Terraform files
    if not os.path.exists(os.path.join(PROJECT_ROOT, 'main.tf')):
        quality["issues"].append("Terraform config should include 'main.tf' for clarity.")
        quality["score"] -= 10

    # Check for Angular app structure
    angular_src = os.path.join(PROJECT_ROOT, 'angular-app', 'src')
    if not os.path.exists(angular_src):
        quality["issues"].append("Angular app structure is incomplete.")
        quality["score"] -= 20

    # Check for Flask app structure
    flask_app = os.path.join(PROJECT_ROOT, 'flask-app', 'app.py')
    if not os.path.exists(flask_app):
        quality["issues"].append("Flask app entry point (app.py) not found.")
        quality["score"] -= 20

    return quality

def generate_narrative_report(loc, tech_stack, infra, quality):
    report = f"""
# Project Intelligence Report

## Executive Summary
This is a full-stack cloud application built with Angular, Flask, and Azure. It demonstrates modern DevOps practices including Infrastructure as Code (Terraform), containerization (Docker), and CI/CD (GitHub Actions). The project is well-structured, with a total of {loc['total']:,} lines of code.

## Architecture Overview
- **Frontend**: Angular 20 (standalone components)
- **Backend**: Flask (Python 3.9)
- **Infrastructure**: Terraform on Microsoft Azure
- **Deployment**: Multi-container Docker on Azure App Service
- **CI/CD**: GitHub Actions (automated build and deploy)

## Technology Stack
The following technologies are actively used:
{chr(10).join(f"  - {t}" for t in tech_stack)}

## Code Quality Assessment
- **Health Score**: {quality['score']}/100
- **Issues Detected**: {len(quality['issues'])}
{chr(10).join(f"  - {issue}" for issue in quality['issues']) if quality['issues'] else "  - No critical issues found."}

## Lines of Code (LOC)
- Angular: {loc['angular']:,} lines
- Flask: {loc['flask']:,} lines
- Terraform: {loc['terraform']:,} lines
- **Total**: {loc['total']:,} lines

## Infrastructure Status
- Terraform Config: {'✅ Present' if infra['terraform'] else '❌ Missing'}
- Docker Compose: {'✅ Configured' if infra['dockerCompose'] else '❌ Not Set Up'}
- CI/CD Pipeline: {'✅ Active' if infra['ciCd'] else '❌ Not Configured'}

## Conclusion
This project is a **professional-grade demonstration** of end-to-end cloud development. It is well-organized, uses modern tools, and follows best practices. With a few improvements (like adding a README), it would be production-ready.

Report generated on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S')}
    """.strip()
    return report

@app.route('/api/project/insight')
def project_insight():
    try:
        # Full project analysis
        loc = count_lines_of_code()
        tech_stack = detect_tech_stack()
        infra = detect_infrastructure()
        quality = analyze_code_quality()
        folder_structure = scan_folder(PROJECT_ROOT)

        # Generate narrative report
        narrative = generate_narrative_report(loc, tech_stack, infra, quality)

        return jsonify({
            "projectName": "My First Cloud App",
            "analysisTimestamp": datetime.now().isoformat(),
            "folderStructure": folder_structure,
            "linesOfCode": loc,
            "technologyStack": tech_stack,
            "infrastructure": infra,
            "codeQuality": quality,
            "narrativeReport": narrative,
            "status": "Analysis complete",
            "version": "2.0.0"
        })
    except Exception as e:
        import traceback  # <-- must be indented at the same level as the next line
        return jsonify({
            "error": str(e),
            "trace": traceback.format_exc()
        }), 500



@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "service": "project-intelligence-engine"})

if __name__ == '__main__':
    # Debug mode only for local testing
    app.run(host='0.0.0.0', port=5000, debug=False)


