from pathlib import Path

for file in Path("./src").rglob("*"):
    if file.is_file() and (
        file.name.endswith(".d.ts") or
        file.name.endswith(".d.ts.map")
    ):
        print(f"Deleting: {file}")
        file.unlink()

print("Done.")