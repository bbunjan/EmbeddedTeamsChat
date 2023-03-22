import { Person } from "../Models/Person";
import { PeopleItemSmall } from "./PeopleItemSmall";

const template = document.createElement("template");
template.innerHTML = `
    <div class="teams-embed-participant-container" style="display: none;">
        <div class="teams-embed-participant-list">
            <!-- List of PeopleItems -->
        </div>
        <div class="teams-embed-participant-list-footer">
            <div class="teams-embed-participant-list-footer-icon">
                <svg viewBox="0 0 32 32" role="presentation" class="app-svg icons-team-operation icons-team-create" focusable="false">
                    <g class="icons-default-fill icons-unfilled"><path d="M11 10C11.1035 10 11.2052 10.0079 11.3045 10.023C10.9143 10.302 10.5621 10.6308 10.2572 11H4C3.44772 11 3 11.4477 3 12V13.5C3 14.9071 4.57862 16 7.5 16C8.11725 16 8.67455 15.9512 9.16969 15.861C9.25335 16.1896 9.36661 16.5065 9.50646 16.8085C8.90367 16.9334 8.23233 17 7.5 17C4.08805 17 2 15.5544 2 13.5V12C2 10.8954 2.89543 10 4 10H11Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17 6.5C17 7.88071 15.8807 9 14.5 9C13.1193 9 12 7.88071 12 6.5C12 5.11929 13.1193 4 14.5 4C15.8807 4 17 5.11929 17 6.5ZM14.5 5C13.6716 5 13 5.67157 13 6.5C13 7.32843 13.6716 8 14.5 8C15.3284 8 16 7.32843 16 6.5C16 5.67157 15.3284 5 14.5 5Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 2C9.433 2 11 3.567 11 5.5C11 7.433 9.433 9 7.5 9C5.567 9 4 7.433 4 5.5C4 3.567 5.567 2 7.5 2ZM7.5 3C6.11929 3 5 4.11929 5 5.5C5 6.88071 6.11929 8 7.5 8C8.88071 8 10 6.88071 10 5.5C10 4.11929 8.88071 3 7.5 3Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19 14.5C19 16.9853 16.9853 19 14.5 19C12.0147 19 10 16.9853 10 14.5C10 12.0147 12.0147 10 14.5 10C16.9853 10 19 12.0147 19 14.5ZM15 12.5C15 12.2239 14.7761 12 14.5 12C14.2239 12 14 12.2239 14 12.5V14H12.5C12.2239 14 12 14.2239 12 14.5C12 14.7761 12.2239 15 12.5 15H14V16.5C14 16.7761 14.2239 17 14.5 17C14.7761 17 15 16.7761 15 16.5V15H16.5C16.7761 15 17 14.7761 17 14.5C17 14.2239 16.7761 14 16.5 14H15V12.5Z"></path></g>
                </svg>
            </div>
            <div class="teams-embed-participant-list-footer-text">
                Add people
            </div>
        </div>
    </div>
    `;

export class ParticipantList extends HTMLElement {
    private personList: Person[];
    private callback: any;
    private disableAddParticipants: boolean;
    constructor(personList: Person[], disableAddParticipants:boolean, callback: any) {
        super();
        this.personList = personList;
        this.disableAddParticipants = disableAddParticipants;
        this.callback = callback;
        this.render();
    }

    show = () => {
        (<HTMLElement>this.querySelector(".teams-embed-participant-container")).style.display = "flex";
    };

    hide = () => {
        (<HTMLElement>this.querySelector(".teams-embed-participant-container")).style.display = "none";
    };

    toggle = () => {
        if ((<HTMLElement>this.querySelector(".teams-embed-participant-container")).style.display == "none")
            this.show();
        else
            this.hide();
    };

    removePerson = (person: Person) => {
        // remove person from DOM
        const list = <HTMLElement>this.querySelector(".teams-embed-participant-list");
        const deleteItem = (<PeopleItemSmall>this.querySelector(`[id="${person.id}"]`));
        if (deleteItem.parentNode) {
            list.removeChild(deleteItem.parentNode);
        }
    };

    addPerson = (person: Person) => {
        // add person to the DOM
        // only add the person if they don't already exist in the DOM
        const personItem = (<PeopleItemSmall>this.querySelector(`[id="${person.id}"]`));
        if (personItem) return;
        const participantList = <HTMLElement>this.querySelector(".teams-embed-participant-list");
        const peopleItems = new PeopleItemSmall(person, null);
        participantList.append(peopleItems);
    };

    render() {
        const container = <HTMLElement>template.content.cloneNode(true);
        const participantList = <HTMLElement>container.querySelector(".teams-embed-participant-list");
        this.personList.forEach((person, index) => {
            const peopleItems = new PeopleItemSmall(person, null);
            participantList.append(peopleItems);
        });

        if (this.disableAddParticipants) {
            (<HTMLElement>container.querySelector(".teams-embed-participant-list-footer")).style.display = "none";
        }

        if (this.callback) {
            (<HTMLElement>container.querySelector(".teams-embed-participant-list-footer")).addEventListener(
                "click",
                this.callback,
            );
        }

        this.appendChild(container);
    }
}

customElements.get("participant-list") || customElements.define("participant-list", ParticipantList);