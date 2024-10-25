[back](./README.md)

---

# Downloading zscaler (or other) root certificates using a browser

In order to avoid errors caused by backstage not being able to validate ssl certificates when proxying requests to backends, it will need to trust the zscalar root certificate.

You can download this using a chrome based browser (including ms edge) by:

1) Browsing to a website, then clicking the padlock icon at the left of the address bar
![padlock icon](./images/address-bar-padlock.png)
2) This will bring up a dialog - expand the 'Connection is secure' item
![padlock-about](./images/padlock-about.png)
3) Then click on the certificate icon at the top
![connection-details](./images/connection-is-secure.png)
4) This will bring up a certificate dialog
![certificate-general](./images/certificate-general.png)
5) Switch to the 'details' tab, and click the 'export' button
![certificate-details](./images/certificate-details.png)
6) The file type you want is 'Base 64 encoded ASCII, single certificate'
![certificate-export-save](./images/certificate-export-save.png)

---
[back](./README.md)
