<template>
  <h2>Choose what to install</h2>
  <div class="options">
    <div>
      <label>Byobu</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Byobu" />
    </div>
    <div>
      <label>Node</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Node" />
    </div>
    <div>
      <label>Ncdu</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Ncdu" />
    </div>
    <div>
      <label>Git</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Git" />
    </div>
    <div>
      <label>Nginx</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Nginx" />
    </div>
    <div>
      <label>Neofetch</label>
      <input
        type="checkbox"
        @click="this.update()"
        v-model="packages.Neofetch"
      />
    </div>
    <div>
      <label>Emby</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Emby" />
    </div>
    <div>
      <label>Saidar</label>
      <input type="checkbox" @click="this.update()" v-model="packages.Saidar" />
    </div>
  </div>
  <br />
  <br />
  <button @click="this.toggle()">Toggle All</button>
  <!-- Make input text backwards -->
  <input class="command" v-model="command" id="command" />
  <br />
  <button @click="this.copy()">Copy</button>
  <p>This was made for Ubuntu 20.04</p>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      command: "",
      packages: {
        Byobu: false,
        Node: false,
        Ncdu: false,
        Git: false,
        Nginx: false,
        Neofetch: false,
        Emby: false,
        Saidar: false,
      },
    };
  },
  methods: {
    toggle() {
      for (let key in this.packages) {
        this.packages[key] = !this.packages[key];
      }
      this.update();
    },
    async copy() {
      await this.update();
      if (!navigator.clipboard) {
        var copyText = document.getElementById("command");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
      } else {
        var text_to_copy = document.getElementById("command").value;
        navigator.clipboard.writeText(text_to_copy).catch(function (error) {
          console.log(error); // error
        });
      }
    },
    async update() {
      await new Promise((resolve) => setTimeout(resolve, 10));
      // Stringify array of all commands that are true
      let array = [];
      for (let key in this.packages) {
        if (this.packages[key]) {
          array.push(key);
        }
      }
      // Stringify array
      let string = JSON.stringify(array).toLocaleLowerCase();
      this.command = `sudo curl -X POST -H "Content-Type: application/json" -d '{"packages": ${string}}' https://ubuntu.astraea.dev/api/installer | bash`;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap");

* {
  font-family: "Source Code Pro", monospace;
}

html {
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #121212;
  color: #fff;

  text-align: center;
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.command {
  border: 2px solid white;
  height: 40px;
  width: 300px;
  border-radius: 5px;

  margin-top: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #121212;
  color: #fff;

  text-align: center;
}

.options {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: stretch;
  max-width: 200px;
  max-height: 500px;
}

.options > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: stretch;
}

input {
  border: 2px solid white;
  height: 20px;
  width: 20px;
  border-radius: 5px;

  /* CHange color */
  background-color: #121212;
  color: #fff;
}
</style>
