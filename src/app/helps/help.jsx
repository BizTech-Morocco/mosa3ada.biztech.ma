"use client";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { useConfirmation } from "../../hooks/useConfimration";

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
  Icon,
} from "@mui/material";

import { formatDate, formatDates, selectedIcon } from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HelpCardConfirmButton } from "./CardConfirmButton";

export default function HelpCard({ help }) {
  const { date, needs, city, location, docId, confirmation_count = 0 } = help;

  const { palette } = useTheme();

  const { confirmationCount, handleConfirmHelp, isLoading, isConfirmed } =
    useConfirmation({
      id: docId,
      confirmation_count,
    });

  return (
    <Card
      sx={{
        minWidth: 350,
        minHeight: 230,
        margin: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {formatDate(date, formatDates.Date)}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            color="text.secondary"
            style={{
              marginRight: "auto",
            }}
          >
            الساعة {formatDate(date, formatDates.Hours)}
          </Typography>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={5}
            style={{
              padding: 5,
              flex: 1,
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <Image
              src="/position.svg"
              alt="position"
              width={20}
              height={20}
              priority
            />
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              variant="h6"
            >
              {city}
            </Typography>
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
              variant="body1"
            >
              {location}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              padding: 5,
              borderRight: "0.5px solid #ACACAC",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {needs?.slice(0, 3).map((need, needInd) => (
              <div
                key={needInd}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <span
                  style={{
                    marginRight: 3,
                    marginLeft: 3,
                  }}
                >
                  {selectedIcon(need)}
                </span>
                <Typography
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                  variant="h5"
                  key={needInd}
                >
                  {need}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions
        style={{
          backgroundColor: "#5B5B5B0D",
          marginTop: "auto",
          padding: "15px 29px",
        }}
      >
        <HelpCardConfirmButton
          isConfirmed={isConfirmed}
          isLoading={isLoading}
          helpCount={confirmationCount}
          onConfirm={handleConfirmHelp}
        />
        <Link
          href={`/helps/${docId}`}
          style={{
            marginRight: "auto",
            color: palette.primary.red,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>إقرأ المزيد</span>
          <ArrowBackIcon
            style={{
              position: "relative",
              top: 3,
            }}
          />
        </Link>
      </CardActions>
    </Card>
  );
}
