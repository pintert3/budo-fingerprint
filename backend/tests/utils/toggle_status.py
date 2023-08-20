#!/usr/bin/env python

from pathlib import Path

f = Path("identity_status")
old_status = f.read_text()[0].upper()

if old_status == "T":
    f.write_text("F")
    print("F")
elif old_status == "F":
    f.write_text("T")
    print("T")
else:
    raise ValueError("Text in identity status_file is neither 'T' nor 'F': {}".format(old_status))
