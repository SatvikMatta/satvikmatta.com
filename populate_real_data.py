import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'website.settings')
django.setup()

from portfolio.models import Project, Skill, Experience

def clear_data():
    """Clear existing data"""
    Project.objects.all().delete()
    Skill.objects.all().delete()
    Experience.objects.all().delete()
    print("Cleared existing data")

def populate_skills():
    """Add skills based on Satvik's resume"""
    skills_data = [
        # Programming Languages
        {'name': 'Python', 'level': 'expert', 'category': 'Programming'},
        {'name': 'Java', 'level': 'advanced', 'category': 'Programming'},
        {'name': 'C', 'level': 'advanced', 'category': 'Programming'},
        {'name': 'C++', 'level': 'advanced', 'category': 'Programming'},
        {'name': 'Verilog', 'level': 'intermediate', 'category': 'Programming'},
        {'name': 'MIPS', 'level': 'intermediate', 'category': 'Programming'},
    

        # Cloud & DevOps
        {'name': 'Google Cloud Platform', 'level': 'intermediate', 'category': 'Cloud'},
        
        # Tools & Frameworks
        {'name': 'PyTorch', 'level': 'intermediate', 'category': 'Machine Learning'},

    ]
    
    for skill_data in skills_data:
        skill, created = Skill.objects.get_or_create(
            name=skill_data['name'],
            defaults={
                'level': skill_data['level'],
                'category': skill_data['category']
            }
        )
        if created:
            print(f"Created skill: {skill.name}")

def populate_projects():
    """Add projects based on Satvik's resume"""
    projects_data = [
        {
            'title': 'TriCen - AI-Powered Mental Health Crisis Response System',
            'description': 'An AI-powered mental health crisis response system that uses speech-to-text, GPT-4o Turbo, and text-to-speech to provide empathetic responses while maintaining caller engagement until human operators are available. Features real-time call summaries and secure data handling.',
            'technology': 'Python, OpenAI GPT-4o Turbo, Twilio API, JavaScript, Real-time Processing',
            'github_url': 'https://github.com/seunghjin/TriCen',
            'live_url': '',
        },
        {
            'title': 'Fire Sentry - Wildfire Prediction System',
            'description': 'A state-of-the-art machine learning model using PyTorch and satellite data for accurate wildfire prediction in the United States. Integrated with ArcGIS and Google Places APIs for enhanced geospatial capabilities with an intuitive Django web interface.',
            'technology': 'Python, PyTorch, Django, ArcGIS API, Google Places API, Machine Learning',
            'github_url': 'https://github.com/themoonwalker1/Fire-Sentry',
            'live_url': '',
        },
    ]
    
    for project_data in projects_data:
        project, created = Project.objects.get_or_create(
            title=project_data['title'],
            defaults=project_data
        )
        if created:
            print(f"Created project: {project.title}")

def populate_experience():
    """Add experience based on Satvik's resume and LinkedIn profile"""
    experience_data = [
        {
            'company': 'Duke University Grill Lab',
            'position': 'Research Associate',
            'description': 'Integrated machine learning models into medical imaging software, reducing manual segmentation errors and improving efficiency. Created 3D visualizations from nerve samples using advanced imaging software while managing terabytes of data through cluster computing.',
            'start_date': 'May 2024',
            'end_date': 'July 2024',
            'order': 3,
        },
        {
            'company': 'Duke University',
            'position': 'Teaching Assistant (Human Skills for Software Engineering)',
            'description': 'Served as TA and project mentor for three MERN stack development teams, analyzing performance and resolving technical challenges. Hosted regular office hours to support students with complex MongoDB, Express.js, React, and Node.js questions.',
            'start_date': 'August 2024',
            'end_date': 'January 2025',
            'order': 4,
        },
        {
            'company': 'Qualcomm Technologies Inc.',
            'position': 'Embedded Modem Software Developer',
            'description': 'Developed a 5G modem crash analysis platform achieving 97% reduction in debug time and deployed it globally through Jenkins. Created an AI pipeline for legacy script conversion with 80% time reduction while training multiple tech leads on implementation.',
            'start_date': 'May 2025',
            'end_date': 'August 2025',
            'order': 6,
        },
        {
            'company': 'Duke University - Electrical and Computer Engineering Dept.',
            'position': 'ECE 110: Intro to Computer Engineering Lab Teaching Assistant',
            'description': 'Implemented interactive lab exercises covering microcontroller programming, digital electronics, and sensor integration with 100% project completion rate. Facilitated group projects and provided technical troubleshooting support for working prototypes.',
            'start_date': 'January 2025',
            'end_date': 'May 2025',
            'order': 5,
        },
        {
            'company': 'Howard-Hughes Medical Institute - Janelia Research Campus',
            'position': 'Machine Learning Researcher',
            'description': 'Developed reinforcement learning algorithms for animal behavior modeling using Unity and Docker environments. Created 3D mesh visualizations and conducted data analysis with Python and Matplotlib, with work presented at Janelia Simulated Bodies Conference (2023).',
            'start_date': 'June 2023',
            'end_date': 'August 2023',
            'order': 2,
        },
        {
            'company': 'George Mason University - College of Science',
            'position': 'Neuromorphic Computing Research Intern',
            'description': 'Developed a physics simulator for autonomous blimp navigation using Pygame and implemented spiking neural networks with Intel\'s Lava Framework. Created spiked convolutional neural network architectures for neuromorphic computing applications.',
            'start_date': 'June 2022',
            'end_date': 'April 2023',
            'order': 1,
        },
    ]
    
    for exp_data in experience_data:
        experience, created = Experience.objects.get_or_create(
            company=exp_data['company'],
            position=exp_data['position'],
            defaults=exp_data
        )
        if created:
            print(f"Created experience: {experience.position} at {experience.company}")

def main():
    print("Populating database with Satvik's real resume data...")
    
    # Clear existing data
    clear_data()
    
    # Populate with real data
    populate_skills()
    populate_projects()
    populate_experience()
    
    print("\nDatabase populated successfully with real data!")
    print(f"Skills: {Skill.objects.count()}")
    print(f"Projects: {Project.objects.count()}")
    print(f"Experience: {Experience.objects.count()}")

if __name__ == '__main__':
    main()