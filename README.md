# CTF  -- [CTF AWESOME](https://github.com/apsdehal/awesome-ctf)
Steps to follow when participating to CTF

## See all opened ports, [here](https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/)

```bash
# All ports
nmap -p- 192.168.1.1
# This may detect more things, takes longer: Detects if ftp is vulnerable
nmap -A 192.168.1.1

nmap -sV -A 192.168.1.1
 
```

### Connect to a specific port
```bash
nc -n 192.168.0.157 13337

```

## More info about the website:
```bash
whatweb http://192.168.0.157:80

Output:
http://192.168.0.157:80 [200 OK] Apache[2.4.27], Country[RESERVED][ZZ], HTML5, HTTPServer[Fedora Linux][Apache/2.4.27 (Fedora)], IP[192.168.0.157], Title[Morty's Website]

```

## Dirbuster

```bash
dirbuster

wordlist: /usr/share/dirbuster/wordlists
```

### Scan website with nikto

```bash
nikto -h host [-port p]
```

### Scan wordpress site:

```bash
wpscan --url host --enumerate vp

# --enumerate vp: vulnerable plugins
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

## Brute force passwords with HYDRA or wpscan

```bash
hydra -l elliot -P ~/fsocity.dic 10.0.2.4 http-post-form “/wp-login.php:log=elliot&pwd=^PASS^:ERROR”

Where:
    -l specifies the username
    -P specifies the dictionary file
    http-post-form is the authentication method being used

and,

“/wp-login.php:log=elliot&pwd=^PASS^:ERROR”

roughly parses to,

    /wp-login.php the login page to attack
    log=elliot is the username on the form
    pwd=^PASS^ substitutes the passwords from the dictionary file
    ERROR tells it what to look for if it fails
```

### WPscan
```bash
wpscan -u 10.0.2.4 --wordlist ~/fsocity.dic --username elliot
```


## WalkThroughs

 - [MrRobot](https://securitybytes.io/vulnhub-com-mr-robot-1-ctf-walkthrough-7d4800fc605a)
 - [Seatle Ctf](https://medium.com/@DRX_Sicher/seattle-ctf-walkthrough-a2fb2bf9367c)
 - []()
