/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/login');
  });
  it('should display login page correctly', () => {
    cy.get('[name="email"]').should('be.visible');
    cy.get('[name="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
    cy.get('[href="/register"]').should('be.visible');
  });

  it('should display error message when email & password is empty', () => {
    // klik tombol login tanpa mengisi email dan password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi pesan error email visible
    cy.get('p')
      .contains(/^Email is required!$/)
      .should('be.visible');

    // memverifikasi pesan error password visible
    cy.get('p')
      .contains(/^Password is required!$/)
      .should('be.visible');
  });

  it('should display error message when email is not valid', () => {
    cy.get('[name="email"]').type('anis');
    cy.get('[name="password"]').type('password');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi pesan error email not valid visible
    cy.get('p')
      .contains(/^Email not valid!$/)
      .should('be.visible');
  });

  it('should display toast when username and password are wrong', () => {
    // mengisi email
    cy.get('[name="email"]').type('anis25@gmail.com');

    // mengisi password yang salah
    cy.get('[name="password"]').type('pass');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi toast alert visible untuk menampilkan pesan dari API
    cy.get('.Toastify__toast--error').should('be.visible');

    cy.get('div')
      .contains(/^email or password is wrong$/)
      .should('be.visible');
  });


  it('should display homepage when username and password are correct', () => {
    // mengisi email
    cy.get('[name="email"]').type('anis25@gmail.com');

    // mengisi password
    cy.get('[name="password"]').type('password');

    // menekan tombol Login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen hanya bisa diakses ketika terautentikasi yang berada di homepage ditampilkan
    cy.get('a[href*="/new"]').should('be.visible');
    cy.get('.MuiAvatar-root').should('be.visible');

    // memverifikasi bahwa elemen button Sign In dan Sign Up tidak tampil
    cy.get('button')
        .contains(/^Sign In$/)
        .should('not.exist')
    cy.get('button')
        .contains(/^Sign Up$/)
        .should('not.exist')


  })
});
