export function parseArgs(processArgs: string[] | null | undefined = null) {
  //@ts-ignore
  const args = processArgs || process.argv.slice(2);
  const items: {
    name: string;
    type: "$" | "-" | "--";
    value: string | boolean;
  }[] = [];
  const $items: string[] = []
  const $other: string[] = []
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.slice(0, 2) == "--") {
      if (a.indexOf("=") > -1) {
        const ats = a.slice(2).split("=");
        items.push({
          type: "--",
          name: ats[0],
          value: ats[1],
        });
      } else {
        const name = a.slice(2);
        const n = args[i + 1];
        let value: any = true;
        if (n != undefined && n.slice(0, 1) != "-") {
          value = n;
          i++;
        }
        items.push({
          type: "--",
          name: name,
          value: value,
        });
      }
    } else if (a.slice(0, 1) == "-") {
      if (a.indexOf("=") > -1) {
        const ats = a.slice(1).split("=");
        items.push({
          type: "-",
          name: ats[0],
          value: ats[1],
        });
      } else {
        const name = a.slice(1);
        const n = args[i + 1];
        let value: any = true;
        if (n != undefined && n.slice(0, 1) != "-") {
          value = n;
          i++;
        }
        items.push({
          type: "-",
          name: name,
          value: value,
        });
      }
    } else if(items.length == 0){
      $items.push(a)
    }else{
      $other.push(a)
    }
  }
  return items.reduce(
    (o, item) => ({
      ...o,
      [item.name]: item.value,
    }),
    { $path: $items, $other },
  );
}
