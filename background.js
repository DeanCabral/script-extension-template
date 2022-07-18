let current = {id: null, tab: null};

const directories = [
    {base: 'https://www.google.com/', func: () => setupGooglePage()},
]

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete' && tab.active) handleCustomRequests(tabId, tab);
})

function handleCustomRequests(id, tab) {
    current.id = id;
    current.tab = tab;

    directories.forEach((dir) => {
        if (current.tab.url.indexOf(dir.base) > -1) dir.func();
    })
}

function setupGooglePage() {
    return chrome.scripting.executeScript({    
        target: {tabId: current.id},
        func: () => {
            let hour = new Date().getHours();
            let str = `Good ${hour < 12 ? 'Morning' : hour >= 12 && hour <= 17 ? 'Afternoon' : 'Evening'}, User`;
            document.getElementsByName('q')[0].placeholder = str;
        }
    }, null); 
}

function setupPageTemplate() {
    return chrome.scripting.executeScript({
        target: {tabId: current.id},
        func: () => {
            // TODO: Custom code snippet to modify DOM elements on current tab webpage
        }
    }, null);
}