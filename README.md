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
