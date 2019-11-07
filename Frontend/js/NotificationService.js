function acceptCancelMessage(message) {
    return Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });
}

function successMessage(message) {
    Swal.fire(
        'Excelent!',
        message,
        'success'
    );
}