# CTF
Steps to follow when participating to CTF

## See all opened ports, [here](https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/)

```bash
# All ports
nmap -p- 192.168.1.1
# This may detect more things, takes longer: Detects if ftp is vulnerable
nmap -A 192.168.1.1
 
```

## Dirbuster

```bash
dirbuster

wordlist: /usr/share/dirbuster/wordlists
```


## Files in images [here](http://ctfs.github.io/resources/topics/steganography/file-in-image/README.html):

```bash
The terminating byte for a JPEG is FF D9 in hex

PK are the initials of Phil Katz, the inventor of the zip file
```

### Image on image [here](https://github.com/zardus/ctf-tools/blob/master/stegsolve/install)

```bash
#!/bin/bash -ex

wget http://www.caesum.com/handbook/Stegsolve.jar -O stegsolve.jar
chmod +x stegsolve.jar
mkdir bin
mv stegsolve.jar bin/
```
