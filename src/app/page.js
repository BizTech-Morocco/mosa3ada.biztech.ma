import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";

import { Container, Grid, Typography } from "@mui/material";

import HelpCard from "./helps/help";
import Header from "@/components/Header";
import getAllDocuments from "@/utils/firebase/firestore/getAllDocuments";
import HelpCards from "./helps/help-cards";

export const dynamic = "force-dynamic";

async function getHelps() {
  let data = [];
  if (
    process.env.CURRENT_ENV === "PRODUCTION" ||
    process.env.NEXT_PUBLIC_USE_FIREBASE === "true"
  ) {
    data = (await getAllDocuments("helps")).map((item) => ({
      docId: item.id,
      ...item.data,
    }));
  } else {
    const jsonDirectory = path.join(process.cwd(), "helpsData");
    const fileContents = await fs.readFile(jsonDirectory + "/helpsV3", "utf8");
    data = JSON.parse(fileContents.toLocaleString()).map((item) => ({
      docId: item.id,
      ...item.data,
    }));
  }

  return data;
}

export default async function HelpsPage() {
  const helps = await getHelps();

  return (
    <>
      <Header
        navComponent={
          <Image
            src="/mosa3ada.svg"
            alt="Mosa3ada Logo"
            width={220}
            height={220}
            priority
          />
        }
      />
      <Container maxWidth="xl">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Typography variant="h3">قائمة الطلبات</Typography>
          {/* <Button color="error" variant="contained" size="large">
            <Typography variant="h6">إضافة طلب</Typography>
          </Button> */}
        </div>
        <Grid container>
          <Grid
            container
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: 50,
            }}
          ></Grid>
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
          <HelpCards data={helps} />
        </Grid>
      </Container>
    </>
  );
}
