const doctors = [
      { department: 'Göz', name: 'Dr. Mehmet Ali' },
      { department: 'Göz', name: 'Dr. Ayşe Demir' },
      { department: 'KBB', name: 'Dr. Ahmet Yılmaz' },
      { department: 'KBB', name: 'Dr. Fatma Kaya' },
      { department: 'Göğüs Hastalıkları', name: 'Dr. Mustafa Çelik' },
      { department: 'Göğüs Hastalıkları', name: 'Dr. Zeynep Yılmaz' },
      { department: 'Dahiliye', name: 'Dr. Ali Can' },
      { department: 'Dahiliye', name: 'Dr. Zehra Ak' },
      { department: 'Genel Cerrahi', name: 'Dr. Ahmet Yılmaz' },
      { department: 'Genel Cerrahi', name: 'Dr. Ayşe Demir' }
    ];
  
    function generateDoctorOptions() {
      const department = document.getElementById('department').value;
      const doctorSelect = document.getElementById('doctor');
      doctorSelect.innerHTML = '<option value="">Doktor Seçin</option>';
      if (department) {
        doctorSelect.removeAttribute('disabled');
        doctors.forEach(doctor => {
          if (doctor.department === department) {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
          }
        });
      } else {
        doctorSelect.setAttribute('disabled', true);
        document.getElementById('requestButton').setAttribute('disabled', true);
      }
    }
  
    function generateTimeSlots() {
      const doctor = document.getElementById('doctor').value;
      const doctorSlotsContainer = document.getElementById('doctorSlots');
      const timeSlotContainer = document.getElementById('timeSlots');
      doctorSlotsContainer.innerHTML = '';
      timeSlotContainer.innerHTML = '';
    
      if (doctor) {
        const startDate = new Date(document.getElementById('appointmentDate').value);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
    
        const dateOptions = [];
        const currentTime = new Date(startDate);
        while (currentTime < endDate) {
          dateOptions.push(new Date(currentTime));
          currentTime.setDate(currentTime.getDate() + 1);
        }
    
        dateOptions.forEach(date => {
          const doctorSlot = document.createElement('div');
          doctorSlot.textContent = date.toLocaleDateString('tr-TR', { weekday: 'long', month: 'long', day: 'numeric' });
          doctorSlot.className = 'doctor-slot';
          doctorSlot.addEventListener('click', function() {
            generateTimeOptions(date, doctor);
          });
          doctorSlotsContainer.appendChild(doctorSlot);
        });
      }
    }

    function generateTimeOptions(date, doctor) {
      const timeSlotContainer = document.getElementById('timeSlots');
      timeSlotContainer.innerHTML = '';
    
      const startTime = new Date(date);
      startTime.setHours(9, 0, 0); // Start at 9:00 AM
      const endTime = new Date(date);
      endTime.setHours(17, 50, 0); // End at 5:50 PM
    
      const timeSlots = [];
      const currentTime = new Date(startTime);
      while (currentTime < endTime) {
        const hour = currentTime.getHours();
        const minute = currentTime.getMinutes();
    
        const timeSlotGroup = document.createElement('div');
        timeSlotGroup.className = 'time-slot-group';
        const hourLabel = document.createElement('div');
        hourLabel.textContent = `${hour.toString().padStart(2, '0')}`;
        hourLabel.className = 'hour-label';
        timeSlotGroup.appendChild(hourLabel);
    
        const minuteContainer = document.createElement('div');
        minuteContainer.className = 'minute-container';
        for (let i = 0; i < 6; i++) {
          const timeSlot = document.createElement('div');
          timeSlot.textContent = `${hour.toString().padStart(2, '0')}:${(i * 10).toString().padStart(2, '0')}`;
          timeSlot.className = 'time-slot';
          timeSlot.addEventListener('click', function() {
            alert(`Randevu talebiniz alındı.\nTarih: ${date.toLocaleDateString('tr-TR')}\nDoktor: ${doctor}\nSaat: ${timeSlot.textContent}`);
            hideCalendar();
          });
          minuteContainer.appendChild(timeSlot);
        }
        timeSlotGroup.appendChild(minuteContainer);
    
        timeSlotContainer.appendChild(timeSlotGroup);
    
        currentTime.setHours(hour + 1, 0, 0); // Move to the next hour
      }
    }
  
    function showCalendar() {
      document.getElementById('calendarContainer').style.display = 'block';
    }
  
    function hideCalendar() {
      document.getElementById('calendarContainer').style.display = 'none';
    }
  
    function requestAppointment() {
      const selectedDate = document.getElementById('appointmentDate').value; // Tarih seçici eklendi
      const doctor = document.getElementById('doctor').value;
      const today = new Date().toISOString().slice(0, 10);
      if (selectedDate >= today && doctor) { // Seçilen zaman kontrolü eklendi
        alert('Randevu talebiniz alındı.');
      } else {
        alert('Geçmiş tarihler veya eksik bilgiler için randevu alınamaz.');
      }
    }
  
    document.getElementById('department').addEventListener('change', generateDoctorOptions);
    document.getElementById('appointmentDate').addEventListener('change', generateTimeSlots);
  
    document.querySelector('a[href="#randevu-al"]').addEventListener('click', function(event) {
      event.preventDefault();
      showCalendar();
    });
