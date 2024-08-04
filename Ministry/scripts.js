// presentation graphs for the ministry.html

 // Example data for charts
 const studentPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Student Performance',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
    }]
};

const moduleEngagementData = {
    labels: ['Module 1', 'Module 2', 'Module 3', 'Module 4'],
    datasets: [{
        label: 'Module Engagement',
        data: [200, 150, 100, 250],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
    }]
};

// Create charts
window.onload = function() {
    const studentPerformanceCtx = document.getElementById('studentPerformanceChart').getContext('2d');
    new Chart(studentPerformanceCtx, {
        type: 'line',
        data: studentPerformanceData,
        options: {}
    });

    const moduleEngagementCtx = document.getElementById('moduleEngagementChart').getContext('2d');
    new Chart(moduleEngagementCtx, {
        type: 'bar',
        data: moduleEngagementData,
        options: {}
    });
};









// the slide ins report.html


function openSlideIn() {
    document.getElementById('report-slidein').style.width = '95%';
}

function closeSlideIn() {
    document.getElementById('report-slidein').style.width = '0';
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.right-panel .section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}

// Load the report slide-in content via AJAX
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    fetch('report-slidein.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('report-slidein-container').innerHTML = data;

            // Initialize charts after content is loaded
            initializeCharts();
        })
        .catch(error => console.error('Error loading slide-in content:', error));
});


// Load the charts 
function initializeCharts() {

    // Initialize charts for Overall University Performance
    const overallPerformanceCtx = document.getElementById('overallPerformanceChart').getContext('2d');
    new Chart(overallPerformanceCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Total Students Enrolled',
                    data: [10000, 10200, 10150, 10500, 10700, 11000],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
                {
                    label: 'Graduation Rate',
                    data: [85, 86, 87, 88, 89, 90],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const gpaCompletionCtx = document.getElementById('gpaCompletionChart').getContext('2d');
    new Chart(gpaCompletionCtx, {
        type: 'bar',
        data: {
            labels: ['Average GPA', 'Course Completion Rate'],
            datasets: [
                {
                    label: 'Average GPA',
                    data: [3.2],
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Course Completion Rate',
                    data: [90],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const satisfactionEmploymentCtx = document.getElementById('satisfactionEmploymentChart').getContext('2d');
    new Chart(satisfactionEmploymentCtx, {
        type: 'pie',
        data: {
            labels: ['Satisfied', 'Neutral', 'Dissatisfied', 'Employed', 'Unemployed'],
            datasets: [{
                label: 'Student Satisfaction & Employment',
                data: [88, 7, 5, 75, 25],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Student Performance
    const enrollmentRetentionCtx = document.getElementById('enrollmentRetentionChart').getContext('2d');
    new Chart(enrollmentRetentionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Student Enrollment',
                    data: [5000, 5050, 5100, 5150, 5200, 5250],
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true,
                },
                {
                    label: 'Retention Rate',
                    data: [80, 81, 82, 83, 84, 85],
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    fill: true,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const studentGpaCompletionCtx = document.getElementById('studentGpaCompletionChart').getContext('2d');
    new Chart(studentGpaCompletionCtx, {
        type: 'bar',
        data: {
            labels: ['Average GPA', 'Course Completion Rate'],
            datasets: [
                {
                    label: 'Average GPA',
                    data: [3.0],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Course Completion Rate',
                    data: [85],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const dropoutSatisfactionCtx = document.getElementById('dropoutSatisfactionChart').getContext('2d');
    new Chart(dropoutSatisfactionCtx, {
        type: 'pie',
        data: {
            labels: ['Dropout', 'Retention', 'Satisfied', 'Neutral', 'Dissatisfied'],
            datasets: [{
                label: 'Dropout & Satisfaction',
                data: [15, 85, 88, 7, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });


// teacher performance

// Teacher Performance Charts
const classSizeTeacherRatioCtx = document.getElementById('classSizeTeacherRatioChart').getContext('2d');
new Chart(classSizeTeacherRatioCtx, {
    type: 'bar',
    data: {
        labels: ['Average Class Size', 'Teacher-Student Ratio'],
        datasets: [
            {
                label: 'Average Class Size',
                data: [25],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Teacher-Student Ratio',
                data: [20],
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const evaluationDevelopmentCtx = document.getElementById('evaluationDevelopmentChart').getContext('2d');
new Chart(evaluationDevelopmentCtx, {
    type: 'radar',
    data: {
        labels: ['Course Evaluation Scores', 'Professional Development'],
        datasets: [
            {
                label: 'Course Evaluation Scores',
                data: [4.5],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Professional Development',
                data: [95],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true
            }
        }
    }
});

const researchPublicationsCtx = document.getElementById('researchPublicationsChart').getContext('2d');
new Chart(researchPublicationsCtx, {
    type: 'pie',
    data: {
        labels: ['Publications'],
        datasets: [{
            label: 'Research Publications',
            data: [200],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// users of the system
// System Users Charts
const userActivityCtx = document.getElementById('userActivityChart').getContext('2d');
new Chart(userActivityCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Active Users',
                data: [1000, 1050, 1100, 1150, 1200, 1250],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'New Users',
                data: [100, 150, 200, 250, 300, 350],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const userEngagementCtx = document.getElementById('userEngagementChart').getContext('2d');
new Chart(userEngagementCtx, {
    type: 'pie',
    data: {
        labels: ['Engaged', 'Not Engaged'],
        datasets: [{
            label: 'User Engagement',
            data: [75, 25],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

const supportRequestsCtx = document.getElementById('supportRequestsChart').getContext('2d');
new Chart(supportRequestsCtx, {
    type: 'doughnut',
    data: {
        labels: ['Requests'],
        datasets: [{
            label: 'Support Requests',
            data: [50],
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// relevant metrics 

// Relevant Metrics Charts
const systemUptimeCtx = document.getElementById('systemUptimeChart').getContext('2d');
new Chart(systemUptimeCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'System Uptime',
                data: [99.9, 99.8, 99.7, 99.9, 99.9, 100],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
            {
                label: 'Page Load Time (s)',
                data: [1.2, 1.3, 1.1, 1.2, 1.3, 1.2],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const resourcesSecurityCtx = document.getElementById('resourcesSecurityChart').getContext('2d');
new Chart(resourcesSecurityCtx, {
    type: 'bar',
    data: {
        labels: ['Resources Accessed', 'Security Incidents'],
        datasets: [
            {
                label: 'Resources Accessed',
                data: [500000],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Security Incidents',
                data: [2],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const userDemographicsCtx = document.getElementById('userDemographicsChart').getContext('2d');
new Chart(userDemographicsCtx, {
    type: 'radar',
    data: {
        labels: ['Diverse', 'Non-Diverse'],
        datasets: [{
            label: 'User Demographics',
            data: [80, 20],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true
            }
        }
    }
});

}

