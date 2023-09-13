import Image from "next/image";
import { Grid } from "@mui/material";

import HelpCard from "./helps/help";
import { getHelps } from "./api/help/service";

export default async function HelpsPage() {
  const helps = await getHelps();

  return (
    <Grid container>
      <Grid
        container
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Image
          src="/mosa3ada.svg"
          alt="Mosa3ada Logo"
          width={180}
          height={37}
          priority
        />
      </Grid>
      <Grid container>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
          }}
        ></Grid>
      </Grid>
      <Grid
        container
        style={{
          justifyContent: "center",
        }}
      >
        {helps?.map((help, ind) => (
          <Grid xs={10} md={4} key={ind}>
            <HelpCard help={help} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
