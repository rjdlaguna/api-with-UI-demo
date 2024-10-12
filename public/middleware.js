function loadUsers()
{
    fetch('/api/users:id')
    .then(response => response.json())
    .then(users=> {
        const tableBody = document.querySelector('tbody');
        users.forEach(user => {
            const row =  
            `<tr>
                <td><img src="/images/user_avatar.jpg"></td>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.salary}</td>
            </tr>`;
    
            tableBody.innerHTML += row;
        })
    })
    .catch(error => console.log('Error fetching users.', error));
}

