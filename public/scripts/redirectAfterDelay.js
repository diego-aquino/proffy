function redirectAfterDelay(delay) {
    setTimeout(() => {
        window.location = '/';
    }, delay);
}

redirectAfterDelay(2500);
