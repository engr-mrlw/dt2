import React, { Component } from "react";
import "./styles/App.css";

import RackFloorInputs from "./components/Inputs/RackFloorInputs";
import ServerInputs from "./components/Inputs/ServerInputs";
import PDUInputs from "./components/Inputs/PDUInputs";
import SwitchInputs from "./components/Inputs/SwitchInputs";
import JBOGInputs from "./components/Inputs/JBOGInputs";

import EntryDisplay from "./components/Display/EntryDisplay";
import BarcodeScannerModal from "./components/Modals/BarcodeScannerModal";

import ActionButtons from "./components/Buttons/ActionButtons";

import {
  saveEntries,
  loadEntries,
  saveForm,
  loadForm,
  saveDarkMode,
  loadDarkMode
} from "./utils/localStorage";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rackSerial: "",
      floor: "",
      servers: [{ serial: "" }],
      pdus: [{ serial: "", mac: "", ru: "" }],
      switches: [{ serial: "", mac: "", ru: "" }],
      jbogs: [{ serial: "" }],
      entries: [],
      darkMode: false,
      apiToken: ""
    };

    this.ruOptions = Array.from({ length: 50 }, (_, i) => `RU${i + 1}`);
  }

  componentDidMount() {
    const entries = loadEntries();
    const form = loadForm();
    const darkMode = loadDarkMode();

    this.setState({
      ...this.state,
      ...form,
      entries,
      darkMode
    });

    if (darkMode) document.body.classList.add("dark");
    this.initMaterialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.entries !== this.state.entries) {
      saveEntries(this.state.entries);
    }

    if (
      prevState.rackSerial !== this.state.rackSerial ||
      prevState.floor !== this.state.floor ||
      prevState.servers !== this.state.servers ||
      prevState.pdus !== this.state.pdus ||
      prevState.switches !== this.state.switches ||
      prevState.jbogs !== this.state.jbogs
    ) {
      const { rackSerial, floor, servers, pdus, switches, jbogs } = this.state;
      saveForm({ rackSerial, floor, servers, pdus, switches, jbogs });
    }

    if (prevState.darkMode !== this.state.darkMode) {
      saveDarkMode(this.state.darkMode);
      document.body.classList.toggle("dark", this.state.darkMode);
    }

    this.initMaterialize();
  }

  initMaterialize = () => {
    if (window.M) {
      window.M.Collapsible.init(document.querySelectorAll(".collapsible"));
      window.M.Modal.init(document.querySelectorAll(".modal"));
      window.M.FormSelect.init(document.querySelectorAll("select"));
    }
  };

  handleFormChange = (field, value) => {
    this.setState({ [field]: value });
  };

  updateListItem = (listName, index, field, value) => {
    const updated = [...this.state[listName]];
    updated[index][field] = value;
    this.setState({ [listName]: updated });
  };

  addListRow = (listName, emptyObj) => {
    this.setState({ [listName]: [...this.state[listName], emptyObj] });
  };

  // Auto-advance barcode input handler
  handleScanInput = (e, listName, index, field) => {
    if (e.key === "Enter") {
      const value = e.target.value;
  
      this.updateListItem(listName, index, field, value);
  
      const next = document.querySelector(
        `[data-scan="${listName}-${index + 1}"]`
      );
  
      if (next) {
        next.focus();
        next.classList.add("highlight-scan");
        setTimeout(() => next.classList.remove("highlight-scan"), 600);
      }
    }
  };
  

  addEntry = () => {
    const { rackSerial, floor, servers, pdus, switches, jbogs } = this.state;

    if (!rackSerial || !floor || servers.some(s => !s.serial)) {
      alert("Rack Serial Number, Floor, and Server Serial Number are required.");
      return;
    }

    const newEntry = {
      timestamp: new Date().toLocaleString(),
      rackSerial,
      floor,
      servers: servers.filter(s => s.serial),
      pdus: pdus.filter(p => p.serial || p.mac || p.ru),
      switches: switches.filter(sw => sw.serial || sw.mac || sw.ru),
      jbogs: jbogs.filter(j => j.serial)
    };

    this.setState({
      entries: [...this.state.entries, newEntry],

      // CLEAR ALL FIELDS
      rackSerial: "",
      floor: "",
      servers: [{ serial: "" }],
      pdus: [{ serial: "", mac: "", ru: "" }],
      switches: [{ serial: "", mac: "", ru: "" }],
      jbogs: [{ serial: "" }]
    });
  };

  exportEntries = () => {
    const { entries } = this.state;
    if (!entries.length) return;
  
    let text = "";
    entries.forEach((entry, index) => {
      text += `Entry ${index + 1}\n`;
      text += `Date/Time: ${entry.timestamp}\n`;
      text += `Rack Serial: ${entry.rackSerial}\n`;
      text += `Floor: ${entry.floor}\n`;
  
      entry.servers.forEach((s, i) => {
        text += `Server ${i + 1}: ${s.serial}\n`;
      });
  
      entry.pdus.forEach((p, i) => {
        text += `PDU ${i + 1}: Serial=${p.serial}, MAC=${p.mac}, RU=${p.ru}\n`;
      });
  
      entry.switches.forEach((sw, i) => {
        text += `Switch ${i + 1}: Serial=${sw.serial}, MAC=${sw.mac}, RU=${sw.ru}\n`;
      });
  
      entry.jbogs.forEach((j, i) => {
        text += `JBOG ${i + 1}: ${j.serial}\n`;
      });
  
      text += `\n`;
    });
  
    // ⭐ Generate formatted filename
    const now = new Date();
    const date = now.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const time = now
      .toLocaleTimeString("en-GB", { hour12: false })
      .replace(/:/g, "-"); // HH-MM-SS
  
    const filename = `DT-${date}-${time}.txt`;
  
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  

  clearEntries = () => {
    this.setState({ entries: [] });
  };

  toggleDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode });
  };

  render() {
    const {
      rackSerial,
      floor,
      servers,
      pdus,
      switches,
      jbogs,
      entries,
      darkMode,
      apiToken
    } = this.state;

    return (
      <div className="app-container">
        <div className="center-align title">DT</div>

        <div className="entry-counter">Entries: {entries.length}</div>

        <div className="dark-toggle">
          <button className="btn grey darken-3" onClick={this.toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* <div className="api-token-box">
          <input
            placeholder="API Token"
            value={apiToken}
            onChange={e => this.setState({ apiToken: e.target.value })}
          />
        </div> */}

        <div className="row">
          <div className="col s4 left-panel">

            <RackFloorInputs
              rackSerial={rackSerial}
              floor={floor}
              onChange={this.handleFormChange}
            />

            <ul className="collapsible">
              <li>
                <div className="collapsible-header">Servers *</div>
                <div className="collapsible-body">
                  <ServerInputs
                    servers={servers}
                    update={(i, field, value) =>
                      this.updateListItem("servers", i, field, value)
                    }
                    add={() => this.addListRow("servers", { serial: "" })}
                    onScan={this.handleScanInput}
                  />
                </div>
              </li>

              <li>
                <div className="collapsible-header">PDU</div>
                <div className="collapsible-body">
                  <PDUInputs
                    pdus={pdus}
                    ruOptions={this.ruOptions}
                    update={(i, field, value) =>
                      this.updateListItem("pdus", i, field, value)
                    }
                    add={() =>
                      this.addListRow("pdus", { serial: "", mac: "", ru: "" })
                    }
                    onScan={this.handleScanInput}
                  />
                </div>
              </li>

              <li>
                <div className="collapsible-header">Switch</div>
                <div className="collapsible-body">
                  <SwitchInputs
                    switches={switches}
                    ruOptions={this.ruOptions}
                    update={(i, field, value) =>
                      this.updateListItem("switches", i, field, value)
                    }
                    add={() =>
                      this.addListRow("switches", {
                        serial: "",
                        mac: "",
                        ru: ""
                      })
                    }
                    onScan={this.handleScanInput}
                  />
                </div>
              </li>

              <li>
                <div className="collapsible-header">JBOG</div>
                <div className="collapsible-body">
                  <JBOGInputs
                    jbogs={jbogs}
                    update={(i, field, value) =>
                      this.updateListItem("jbogs", i, field, value)
                    }
                    add={() => this.addListRow("jbogs", { serial: "" })}
                    onScan={this.handleScanInput}
                  />
                </div>
              </li>
            </ul>

            <ActionButtons
              onDisplay={this.addEntry}
              onExport={this.exportEntries}
              onClear={this.clearEntries}
            />

            <div className="version">Version 1.0</div>
          </div>

          <div className="col s8 right-panel">
            <h5>Entries</h5>
            <EntryDisplay entries={entries} />
          </div>
        </div>

        <BarcodeScannerModal />
      </div>
    );
  }
}
