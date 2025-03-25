import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Grid,
  CardHeader,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const MaterialCard = ({ material }) => {
  if (!material) {
    return (
      <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
        <CardHeader title="Material Details" />
        <CardContent>
          <Typography variant="h5" color="text.secondary" align="center">
            Material details are not available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 900, margin: "30px auto", border: "3px solid #ccc" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {material.title} - {material.subCategory?.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Category: {material.category?.title} ({material.category?.metaTitle})
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
          Summary:
        </Typography>
        <Typography variant="body1">{material.summary}</Typography>

        <Divider sx={{ my: 2 }} />

        <Typography
          sx={{ fontWeight: "bold" }}
          variant="subtitle1"
          gutterBottom
        >
          Content:
        </Typography>
        <Typography variant="body1">{material.content}</Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Created At:{" "}
              {material.createdAt
                ? new Date(material.createdAt).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="text.secondary">
              Updated At:{" "}
              {material.updatedAt
                ? new Date(material.updatedAt).toLocaleDateString()
                : "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Link to="/material" size="small" color="primary">
          Back to List
        </Link>
      </CardActions>
    </Card>
  );
};

const Material = () => {
  const location = useLocation();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    setMaterial(location.state?.currentMaterial || null);
  }, [location.state]);

  return <MaterialCard material={material} />;
};

export default Material;
