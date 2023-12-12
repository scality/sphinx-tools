function fontAwesomeIcon(name) {
  const icon = document.createElement("i");
  icon.className = `fas fa-${name} fa-lg`;
  return icon;
}

function attachCopyButton(className, copyArea) {
  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.className = `${className}__copy-tooltip`;
  copyArea.onmouseenter = () => {
    tooltip.style.display = "block";
  };
  copyArea.onmouseleave = () => {
    tooltip.style.display = "none";
  };

  // Button
  const button = document.createElement("a");
  button.className = `${className}__copy-button`;
  
  button.onclick = () => {
    const copyText = copyArea.parentElement.children[0].innerText.trimEnd();
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setCopyState(className, tooltip, button, copyArea, {
          modifier: "success",
          text: "Copied!",
          icon: "check-circle",
        });
        setTimeout(() => {
          setCopyState(className, tooltip, button, copyArea, {
            icon: "check-circle", // Keep the checked icon, for easier tracking
          });
        }, 2000);
        console.debug("Successfully copied the following content:\n", copyText);
      })
      .catch((error) => {
        setCopyState(className, tooltip, button, copyArea, {
          modifier: "error",
          text: "An error occured, see the console",
          icon: "times-circle",
        });
        setTimeout(() => {
          setCopyState(className, tooltip, button, copyArea, {});
        }, 2000);
        console.error("Failed to copy content:\n", error);
      });
  };

  setCopyState(className, tooltip, button, copyArea, {});

  copyArea.appendChild(tooltip);
  copyArea.appendChild(button);
}

function setCopyState(
  className,
  tooltip,
  button,
  area,
  { modifier, text = "Copy", icon = "copy" }
) {
  area.className = `${className}__copy`;
  if (modifier !== undefined)
    area.classList.add(`${className}__copy--${modifier}`);
  tooltip.innerText = text;
  button.innerHTML = "";
  button.appendChild(fontAwesomeIcon(icon));
}

function attachAllCopyButtons(className, contentModifier) {
  const blocks = document.getElementsByClassName(className);
  console.debug(
    `Found ${blocks.length} blocks matching '.${className}':`,
    blocks
  );

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const copyArea = block.getElementsByClassName(`${className}__copy`)[0];
    
    attachCopyButton(className, copyArea);
    console.debug(`Added copy button for ${block.id}`);
  }
}

window.onload = () => {
  attachAllCopyButtons("command-block", "input-text");
  attachAllCopyButtons("copy-block", "content");
};
