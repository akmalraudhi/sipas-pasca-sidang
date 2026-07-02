import "./styles/globals.css"; // Mengarah dengan benar ke app/styles/globals.css

export const metadata = {
  title: "SIPAS Paramadina",
  description: "Sistem Informasi Pasca Sidang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
