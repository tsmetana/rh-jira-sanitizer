PKGNAME = jira-sanitize.zip
ZIP = /usr/bin/zip

FILES = manifest.json \
		jira-sanitize.js

.PHONY: all clean zip

all: zip

zip:
	$(ZIP) $(PKGNAME) $(FILES)

clean:
	-rm -f $(PKGNAME)
