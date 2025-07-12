import json
import os
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def load_json_data(filename):
    """Load data from JSON file"""
    file_path = os.path.join(settings.BASE_DIR, 'data', filename)
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError as e:
        print(f"File not found: {file_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"JSON decode error in {file_path}: {e}")
        return []
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return []

@csrf_exempt
def projects_list(request):
    """Return projects data from JSON file"""
    projects = load_json_data('projects.json')
    return JsonResponse(projects, safe=False)

@csrf_exempt
def skills_list(request):
    """Return skills data from JSON file"""
    skills = load_json_data('skills.json')
    return JsonResponse(skills, safe=False)

@csrf_exempt
def experience_list(request):
    """Return experience data from JSON file sorted by order"""
    experience = load_json_data('experience.json')
    # Sort by order field in descending order (most recent first)
    experience.sort(key=lambda x: x.get('order', 0), reverse=True)
    return JsonResponse(experience, safe=False)

@csrf_exempt
def portfolio_summary(request):
    """Return summary statistics"""
    projects = load_json_data('projects.json')
    skills = load_json_data('skills.json')
    experience = load_json_data('experience.json')
    
    return JsonResponse({
        'projects_count': len(projects),
        'skills_count': len(skills),
        'experience_count': len(experience),
    })
