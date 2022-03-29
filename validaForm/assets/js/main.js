class Formulario {
  constructor () {
    this.formulario = document.getElementById('formulario');
    this.eventos()
  }
  // Eventos
  eventos() {
    this.formulario.addEventListener('submit', e => {
      e.preventDefault();
      this.verificar();
    } )
  };
  // Função de verificar os campos
  verificar() {
    for (let erroText of this.formulario.querySelectorAll('.error-text')){
      erroText.remove();
    }
    for (let campo of this.formulario.querySelectorAll('.validar')){
      const label = campo.previousElementSibling.innerText;
      this.verificaVazio(campo, label);
      }
    this.verificaCPF(this.formulario.querySelector('.cpf'));
    this.verificaUsuario(this.formulario.querySelector('.usuario'));
    this.verificarSenha();
  };
  // Nenhum campo vazio
  verificaVazio(campo, label) {
    if(campo.value == ''){
      this.criaErro(campo, 'O campo ' + label + ' não pode estar vazio.');
    }
  };
  // Travar o Elemento
  travas(e) {
    this.verificar();
  };
  // Cria a mensagem de erro
  criaErro(campo, mensagem) {
    const div = document.createElement('div');
    div.innerHTML = mensagem
    div.classList.add('error-text');
    campo.insertAdjacentElement('afterend', div);
  }
  // CPF
  verificaCPF(campo){
    const cpf = new ValidaCPF (campo.value);
    if (!cpf.valida()) {
      this.criaErro(campo, 'Cpf é invalido')
      return false;
    }
    return true;
  };
  // Usuario
  verificaUsuario(campo) {
    const usuario = campo.value;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuario precisa ter entre 3 e 12 caracteres.');
    }
    else if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(campo, 'Nome de usuário precisa conter apenas número e/ou letras.');
    };
  }
  verificarSenha() {
    const senha = document.getElementById('senha');
    const repetirSenha = document.getElementById('repetir-senha');

    if(senha.value.length < 6 || senha.value.length > 12) {
      this.criaErro(senha, 'A senha precisa ter entre 6 e 12 caracteres');
    }
    else if (senha.value !== repetirSenha.value) {
      this.criaErro(senha, 'Campos senha e repetir senha precisam ser iguais');
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisam ser iguais');
    }
  };
}

const formulario = new Formulario ();

