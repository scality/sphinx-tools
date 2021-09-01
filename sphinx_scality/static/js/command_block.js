function fontAwesomeIcon(name) {
  const icon = document.createElement("i");
  icon.className = `fas fa-${name} fa-lg`;
  return icon;
}

function attachCopyButton(copyText, copyArea) {
  // Tooltip
  const tooltip = document.createElement("div");
  tooltip.className = "command-block__copy-tooltip";
  copyArea.onmouseenter = () => {
    tooltip.style.display = "block";
  };
  copyArea.onmouseleave = () => {
    tooltip.style.display = "none";
  };

  // Button
  const button = document.createElement("a");
  button.className = "command-block__copy-button";
  button.onclick = () => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        setCopyState(tooltip, button, copyArea, {
          modifier: "success",
          text: "Copied!",
          icon: "check-circle",
        });
        setTimeout(() => {
          setCopyState(tooltip, button, copyArea, {
            icon: "check-circle", // Keep the checked icon, for easier tracking
          });
        }, 2000);
        console.debug("Successfully copied the following command:\n", copyText);
      })
      .catch((error) => {
        setCopyState(tooltip, button, copyArea, {
          modifier: "error",
          text: "An error occured, see the console",
          icon: "times-circle",
        });
        setTimeout(() => {
          setCopyState(tooltip, button, copyArea, {});
        }, 2000);
        console.error("Failed to copy command:\n", error);
      });
  };

  setCopyState(tooltip, button, copyArea, {});

  copyArea.appendChild(tooltip);
  copyArea.appendChild(button);
}

function setCopyState(
  tooltip,
  button,
  area,
  { modifier, text = "Copy", icon = "copy" }
) {
  area.className = "command-block__copy";
  if (modifier !== undefined)
    area.classList.add(`command-block__copy--${modifier}`);
  tooltip.innerText = text;
  button.innerHTML = "";
  button.appendChild(fontAwesomeIcon(icon));
}

window.onload = () => {
  const commandBlocks = document.getElementsByClassName("command-block");
  console.debug(`Found ${commandBlocks.length} command blocks:`, commandBlocks);

  for (let index = 0; index < commandBlocks.length; index++) {
    const block = commandBlocks[index];
    const copyArea = block.getElementsByClassName("command-block__copy")[0];
    const inputArea = block.getElementsByClassName(
      "command-block__input-text"
    )[0];
    const copyText = inputArea.innerText.trimEnd();
    attachCopyButton(copyText, copyArea);
    console.debug(`Added copy button for ${block.id}`);
  }
};
