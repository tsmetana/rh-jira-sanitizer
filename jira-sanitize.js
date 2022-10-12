// Replace case numbers with actual links to the portal
function createCaseLinks() {
    sfdcNumDiv = document.getElementById("customfield_12313441-val");
    if (sfdcNumDiv != null) {
        sfdcNums = sfdcNumDiv.innerText.trim().split(" ");
        sfdcNumDiv.innerText = "";
        sfdcNums.forEach(sfdcNum => {
            sfdcLink = document.createElement("a");
            sfdcLinkText = document.createTextNode(sfdcNum);
            sfdcLink.appendChild(sfdcLinkText);
            sfdcLink.href = "https://access.redhat.com/support/cases/#/case/" + sfdcNum;
            sfdcNumDiv.appendChild(sfdcLink);
            sfdcLink.appendChild(document.createTextNode(" "));
        });
    }
}

// Render description and comments in monospace
function setMonospaceStyle(element) {
    // the font type and size is taken from Jira code blocks
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '12px';
}

const emojiTable = {
	'smile.png': ":)",
	'sad.png': ":(",
	'tongue.png': ":P",
	'biggrin.png': ":D",
	'wink.png': ";)",
	'thumbs_up.png': "(y)",
	'thumbs_down.png': "(n)",
	'information.png': "(i)",
	'check.png': "(/)",
	'error.png': "(x)",
	'warning.png': "(!)",
	'add.png': "(+)",
	'forbidden.png': "(-)",
	'help_16.png': "(?)",
	'lightbulb_on.png': "(on)",
	'lightbulb.png': "(off)",
	'star_yellow.png': "(*)", // or (*y); there is no certain mapping
	'star_red.png': "(*r)",
	'star_green.png': "(*g)",
	'star_blue.png': "(*b)",
	'flag.png': "(flag)",
	'flag_grey.png': "(flagoff)"
};

function unrenderEmoticons(element) {
    emoticonElements = element.getElementsByClassName('emoticon');
    emoticons = Array.prototype.filter.call(
        emoticonElements,
        (e) => e.nodeName === 'IMG',
    );
    emoticons.forEach(img => {
        idx = img.src.lastIndexOf('/');
        pngfile = img.src.substring(idx + 1);
        rep = emojiTable[pngfile];
        if (rep !== undefined) {
            img.replaceWith(document.createTextNode(rep));
        }
    })
}

function userContentToMonospace() {
    userContentElements = document.querySelectorAll('.user-content-block');
    userContentElements.forEach(unrenderEmoticons);
    userContentElements.forEach(setMonospaceStyle);
    userContentElements = document.querySelectorAll('.activity-comment .action-body');
    userContentElements.forEach(setMonospaceStyle);
}

// Main block
userContentToMonospace();
createCaseLinks();
