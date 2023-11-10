"use client";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

export default function ApiDocs() {
  return <SwaggerUI url="/swagger.json" />;
}
