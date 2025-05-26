/**
 * Indo American Play School - Attendance System JavaScript
 * This file contains scripts for the attendance tracking functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const toggleAttendanceBtn = document.getElementById('toggleAttendanceSystem');
    const attendanceContent = document.getElementById('attendanceSystemContent');
    const toggleIcon = document.getElementById('attendanceToggleIcon');
    const markAttendanceTab = document.getElementById('markAttendanceTab');
    const loadClassBtn = document.getElementById('loadClassBtn');
    const saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
    const attendanceMonth = document.getElementById('attendanceMonth');
    const attendanceDate = document.getElementById('attendanceDate');
    const studentSelector = document.getElementById('studentSelector');
    const reportStudentSelector = document.getElementById('reportStudentSelector');
    const calendarBody = document.getElementById('attendanceCalendarBody');
    
    // Demo data - In a real application, this would come from a database
    const demoStudents = [
        { id: 1, name: "Aanya Sharma", class: "Playgroup - A" },
        { id: 2, name: "Virat Patel", class: "Playgroup - A" },
        { id: 3, name: "Samaira Khan", class: "Nursery - B" },
        { id: 4, name: "Arjun Mehta", class: "Nursery - B" },
        { id: 5, name: "Ishaan Singh", class: "LKG - A" },
        { id: 6, name: "Advika Reddy", class: "LKG - A" },
        { id: 7, name: "Vihaan Gupta", class: "UKG - C" },
        { id: 8, name: "Anaya Joshi", class: "UKG - C" }
    ];
    
    // Demo attendance data - In a real app, this would come from a database
    const demoAttendance = {
        "2025-05-01": { 1: "present", 2: "present", 3: "present", 4: "absent", 5: "present", 6: "late", 7: "present", 8: "present" },
        "2025-05-02": { 1: "present", 2: "absent", 3: "present", 4: "present", 5: "present", 6: "present", 7: "present", 8: "present" },
        "2025-05-05": { 1: "present", 2: "present", 3: "present", 4: "present", 5: "absent", 6: "present", 7: "present", 8: "late" },
        "2025-05-06": { 1: "present", 2: "present", 3: "late", 4: "present", 5: "present", 6: "present", 7: "absent", 8: "present" }
    };
    
    // Initialize date inputs with current date
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // Format: YYYY-MM
    const currentDate = today.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    
    if (attendanceMonth) {
        attendanceMonth.value = currentMonth;
    }
    
    if (attendanceDate) {
        attendanceDate.value = currentDate;
    }
    
    // Toggle attendance system visibility
    if (toggleAttendanceBtn && attendanceContent) {
        toggleAttendanceBtn.addEventListener('click', function() {
            if (attendanceContent.style.display === 'none') {
                attendanceContent.style.display = 'block';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            } else {
                attendanceContent.style.display = 'none';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            }
        });
    }
    
    // Check if user is a teacher (for demo purposes)
    // In a real application, this would be determined by user role in authentication
    function checkTeacherRole() {
        // Simulating a teacher login for demonstration
        const isTeacher = localStorage.getItem('userRole') === 'teacher';
        
        if (isTeacher && markAttendanceTab) {
            markAttendanceTab.style.display = 'block';
        }
    }
    
    // For demo purposes - allow switching between parent and teacher views
    function setupRoleSwitcher() {
        // Create a role switcher button for demo
        const navTabs = document.getElementById('attendanceTab');
        if (navTabs) {
            const roleSwitcher = document.createElement('div');
            roleSwitcher.classList.add('ms-auto', 'd-flex', 'align-items-center');
            roleSwitcher.innerHTML = `
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="roleToggle">
                    <label class="form-check-label" for="roleToggle">Teacher View</label>
                </div>
            `;
            navTabs.appendChild(roleSwitcher);
            
            // Add event listener to role toggle
            const roleToggle = document.getElementById('roleToggle');
            if (roleToggle) {
                roleToggle.addEventListener('change', function() {
                    if (this.checked) {
                        localStorage.setItem('userRole', 'teacher');
                        markAttendanceTab.style.display = 'block';
                    } else {
                        localStorage.setItem('userRole', 'parent');
                        markAttendanceTab.style.display = 'none';
                    }
                });
            }
        }
    }
    
    // Generate attendance calendar based on selected month
    function generateCalendar() {
        if (!calendarBody || !attendanceMonth) return;
        
        const selectedMonth = attendanceMonth.value;
        const [year, month] = selectedMonth.split('-').map(Number);
        
        // Calculate first day of month and total days
        const firstDay = new Date(year, month - 1, 1).getDay();
        const daysInMonth = new Date(year, month, 0).getDate();
        
        // Clear previous calendar
        calendarBody.innerHTML = '';
        
        // Create calendar rows and cells
        let date = 1;
        for (let i = 0; i < 6; i++) { // Max 6 rows in a month
            if (date > daysInMonth) break;
            
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) { // 7 days in a week
                const cell = document.createElement('td');
                
                // Fill in the first row with blank cells until the first day of the month
                if (i === 0 && j < firstDay) {
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    cell.textContent = '';
                } else {
                    // Check if weekend or holiday
                    const isWeekend = j === 0 || j === 6; // Sunday or Saturday
                    
                    if (isWeekend) {
                        // Weekend
                        cell.innerHTML = `<div class="attendance-day holiday">${date}</div>`;
                    } else {
                        // Regular school day - check attendance status
                        const currentDate = `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                        const studentId = studentSelector.value === "Aanya Sharma" ? 1 : 2; // For demo purposes
                        const status = demoAttendance[currentDate] ? demoAttendance[currentDate][studentId] : null;
                        
                        if (status) {
                            cell.innerHTML = `<div class="attendance-day ${status}">${date}</div>`;
                        } else {
                            cell.innerHTML = `<div class="attendance-day">${date}</div>`;
                        }
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }
    
    // Load class students for attendance marking
    function loadClassStudents() {
        const classSelector = document.getElementById('classSelector');
        const studentList = document.getElementById('studentAttendanceList');
        
        if (!classSelector || !studentList) return;
        
        const selectedClass = classSelector.value;
        
        // Clear previous list
        studentList.innerHTML = '';
        
        // Filter students by class
        const filteredStudents = demoStudents.filter(student => student.class === selectedClass);
        
        // Generate student list for marking attendance
        filteredStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>
                    <div class="btn-group" role="group">
                        <input type="radio" class="btn-check" name="attendance-${student.id}" id="present-${student.id}" value="present" checked>
                        <label class="btn btn-outline-success btn-sm" for="present-${student.id}">Present</label>
                        
                        <input type="radio" class="btn-check" name="attendance-${student.id}" id="absent-${student.id}" value="absent">
                        <label class="btn btn-outline-danger btn-sm" for="absent-${student.id}">Absent</label>
                        
                        <input type="radio" class="btn-check" name="attendance-${student.id}" id="late-${student.id}" value="late">
                        <label class="btn btn-outline-warning btn-sm" for="late-${student.id}">Late</label>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control form-control-sm" placeholder="Add remarks">
                </td>
            `;
            studentList.appendChild(row);
        });
    }
    
    // Save attendance (demo function)
    function saveAttendance() {
        // In a real application, this would send data to a server
        alert('Attendance saved successfully!');
    }
    
    // Generate attendance chart for reports
    function generateAttendanceChart() {
        const ctx = document.getElementById('attendanceChart');
        
        if (!ctx) return;
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            return;
        }
        
        // Destroy existing chart if any
        if (window.attendanceChartInstance) {
            window.attendanceChartInstance.destroy();
        }
        
        // Sample data for the chart
        const chartData = {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'Present',
                    backgroundColor: 'rgba(60, 219, 162, 0.5)',
                    borderColor: 'rgba(60, 219, 162, 1)',
                    data: [18, 19, 20, 19, 18]
                },
                {
                    label: 'Absent',
                    backgroundColor: 'rgba(242, 95, 92, 0.5)',
                    borderColor: 'rgba(242, 95, 92, 1)',
                    data: [2, 0, 1, 1, 2]
                },
                {
                    label: 'Late',
                    backgroundColor: 'rgba(255, 230, 109, 0.5)',
                    borderColor: 'rgba(255, 230, 109, 1)',
                    data: [1, 2, 0, 1, 1]
                }
            ]
        };
        
        // Create bar chart
        window.attendanceChartInstance = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 25
                    }
                },
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Monthly Attendance'
                    }
                }
            }
        });
    }
    
    // Event listeners
    if (attendanceMonth) {
        attendanceMonth.addEventListener('change', generateCalendar);
    }
    
    if (studentSelector) {
        studentSelector.addEventListener('change', generateCalendar);
    }
    
    if (loadClassBtn) {
        loadClassBtn.addEventListener('click', loadClassStudents);
    }
    
    if (saveAttendanceBtn) {
        saveAttendanceBtn.addEventListener('click', saveAttendance);
    }
    
    // Call initial functions
    checkTeacherRole();
    setupRoleSwitcher(); // For demo purposes
    generateCalendar();
    
    // Initialize attendance chart if reporting tab is selected
    document.querySelector('#attendance-report-tab').addEventListener('click', function() {
        setTimeout(generateAttendanceChart, 100); // Delay to ensure canvas is ready
    });
});
