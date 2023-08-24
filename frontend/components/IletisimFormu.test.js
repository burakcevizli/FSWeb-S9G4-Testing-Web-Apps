import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

test('hata olmadan render ediliyor', () => {
    render(<IletisimFormu />)
});

test('iletişim formu headerı render ediliyor', () => {
    render(<IletisimFormu />)
    const header = screen.getByText(/İletişim Formu/i)
    expect(header).toBeInTheDocument()
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    render(<IletisimFormu />)
    const ilhan = screen.getByPlaceholderText(/İlhan/i)
    userEvent.type(ilhan, "abcd")

    const errorMessage = screen.getByText(/Hata: ad en az 5 karakter olmalıdır./i)
    expect(errorMessage).toBeVisible()

    userEvent.type(ilhan, "e")
    expect(errorMessage).not.toBeVisible()
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />)

    const buton = screen.getByText(/gönder/i)

    userEvent.click(buton)

    const errorMessageAd = screen.getByText(/Hata: ad en az 5 karakter olmalıdır./i)

    const errorMessageSoyad = screen.getByText(/Hata: soyad gereklidir./i)

    const errorMessageEmail = screen.getByText(/Hata: email geçerli bir email adresi olmalıdır./i)

    expect(errorMessageAd).toBeVisible()
    expect(errorMessageSoyad).toBeVisible()
    expect(errorMessageEmail).toBeVisible()

});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {

    render(<IletisimFormu />)

    const isim = screen.getByPlaceholderText(/İlhan/i)
    userEvent.type(isim, "Burak")

    const soyİsim = screen.getByPlaceholderText("Mansız")
    userEvent.type(soyİsim, "CEVİZLİ")

    const buton = screen.getByText(/gönder/i)

    userEvent.click(buton)
    const errorMessageEmail = screen.getByText(/Hata: email geçerli bir email adresi olmalıdır./i)
    expect(errorMessageEmail).toBeVisible()


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
    render(<IletisimFormu />)

    const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i)
    userEvent.type(mail, "Burak")

    const errorMessageEmail = screen.getByText(/Hata: email geçerli bir email adresi olmalıdır./i)

    expect(errorMessageEmail).toBeInTheDocument()

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu />)

    const isim = screen.getByPlaceholderText(/İlhan/i)
    userEvent.type(isim, "Burak")

    const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i)
    userEvent.type(mail, "burakcevizli@gmail.com")

    const buton = screen.getByText(/gönder/i)

    userEvent.click(buton)

    const errorMessageEmail = screen.getByText(/Hata: soyad gereklidir./i)

    expect(errorMessageEmail).toBeInTheDocument()

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    render(<IletisimFormu />)

    const isim = screen.getByPlaceholderText(/İlhan/i)
    userEvent.type(isim, "Burak")

    const soyİsim = screen.getByPlaceholderText("Mansız")
    userEvent.type(soyİsim, "CEVİZLİ")

    const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i)
    userEvent.type(mail, "burakcevizli@gmail.com")

    const buton = screen.getByText(/gönder/i)

    userEvent.click(buton)

    const errorMessage = screen.queryAllByTestId("error");
    expect(errorMessage).toHaveLength(0);

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

    render(<IletisimFormu />)

    const isim = screen.getByPlaceholderText(/İlhan/i)
    userEvent.type(isim, "Burak")

    const soyİsim = screen.getByPlaceholderText("Mansız")
    userEvent.type(soyİsim, "CEVİZLİ")

    const mail = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i)
    userEvent.type(mail, "burakcevizli@gmail.com")

    const mesaj = screen.getByLabelText(/Mesaj/i)
    userEvent.type(mesaj, "Workintech Öğrencisi")

    const buton = screen.getByText(/gönder/i)

    userEvent.click(buton)


});
