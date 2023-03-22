const getIconHtml = (checked: boolean) => {
    let html = `
    <div class="teams-embed-chat-message-send-status-icon">
        <svg role="sendstatus" focusable="false" viewBox="0 0 10 10">
            <path d="M4.99769 0C2.23754 0 0 2.23754 0 4.99769C0 7.75784 2.23754 9.99538 4.99769 9.99538C7.75784 9.99538 9.99538 7.75784 9.99538 4.99769C9.99538 2.23754 7.75784 0 4.99769 0ZM1 4.99769C1 2.78983 2.78983 1 4.99769 1C7.20555 1 8.99538 2.78983 8.99538 4.99769C8.99538 7.20555 7.20555 8.99538 4.99769 8.99538C2.78983 8.99538 1 7.20555 1 4.99769Z"></path>
            `;
    if (checked) {
        html += `<path d="M7.10355 3.39645C7.29882 3.59171 7.29882 3.90829 7.10355 4.10355L4.85355 6.35355C4.65829 6.54882 4.34171 6.54882 4.14645 6.35355L3.14645 5.35355C2.95118 5.15829 2.95118 4.84171 3.14645 4.64645C3.34171 4.45118 3.65829 4.45118 3.85355 4.64645L4.5 5.29289L6.39645 3.39645C6.59171 3.20118 6.90829 3.20118 7.10355 3.39645Z"></path>`;
    }
    html += `</svg>
            <span class="tooltiptext"></span>
        </div>`;
    return html;
}


const icon = document.createElement("template");

export class StatusIcon extends HTMLElement {
    checked: boolean;

    constructor(checked: boolean)  {
        super();
        this.checked = checked;
        this.render();
    }

    render = () => {
        icon.innerHTML = getIconHtml(this.checked);
        const dom = <HTMLElement>icon.content.cloneNode(true);
        this.appendChild(dom);
    }
}

customElements.get("status-icon") || customElements.define("status-icon", StatusIcon);
